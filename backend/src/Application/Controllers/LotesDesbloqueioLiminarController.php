<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LoteDesbloqueioDomain;
use App\Domain\LoteDesbloqueioOperacaoDomain;
use App\Domain\UserDomain;
use App\Persistence\LoteDesbloqueioDao;
use App\Persistence\LoteDesbloqueioOperacaoDao;
use App\Persistence\SaldoNotaEmpenhoDao;
use App\Persistence\LoteDesbloqueioFileDao;
use App\Persistence\LiminarDao;
use App\Persistence\LiminarOperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ExpedienteGovService;
use Exception;
use RuntimeException;

class LotesDesbloqueioLiminarController extends ControllerBase
{
    private $dao;
    private $loteDesbloqueioOperacaoDao;
    private $liminarDao;
    private $liminarOperacaoDao;
    private $saldoNotaEmpenhoDao;
    private $loteDesbloqueioFileDao;
    private $expedienteGovService;
    private $mail;
    private $templates;
    private $gerentes;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
        $this->liminarDao = new LiminarDao($container);
        $this->liminarOperacaoDao = new LiminarOperacaoDao($container);
        $this->loteDesbloqueioOperacaoDao = new LoteDesbloqueioOperacaoDao($container);
        $this->loteDesbloqueioFileDao = new LoteDesbloqueioFileDao($container);
        $this->saldoNotaEmpenhoDao = new SaldoNotaEmpenhoDao($container);
        $this->expedienteGovService = new ExpedienteGovService($container);
        $this->mail = $container->get('mailer');
        $this->templates = $container->get('templates');
        $this->gerentes = $container->get('settings')['managers'];
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $currentUser = $req->getAttributes()['user'];
        $jwt = $currentUser['token'];
        $user = new UserDomain(json_decode($currentUser['attributes'], true));

        $argsarams = $req->getParsedBody();
        $expediente = $this->expedienteGovService->create($jwt, array(
            "expediente" => array(
                "co_tipo" => "CE",
                "tx_assunto" => "RAP - Lote de desbloqueio por liminar",
                "co_classificacao" => 2,
                "co_grupo" => 10,
                "tx_destino" => $this->gerentes['gerenciaExecutivaFinanceira']
            ),
        ));
        $lote = new LoteDesbloqueioDomain();
        $lote
          ->setCe($expediente['tx_identificacao'])
          ->setResponsavelId($user->getRegistration())
          ->setResponsavelNome($user->getName())
          ->setResponsavelUnidadeId($user->getPhysicalLotationId())
          ->setResponsavelUnidadeSigla($user->getPhysicalLotationAbbreviation());

        $connection = $this->dao->getConnection();
        $connection->beginTransaction();

        try {
            $liminar = $this->liminarDao->find((string) $argsarams['id']);
            $liminarOperacoes = $this->liminarOperacaoDao->findAllBy([
                ['COLUMN' => 'liminarId', 'VALUE' => $liminar->getId()],
            ]);
            $saldosEmpenhos = [];

            foreach ($liminarOperacoes as $operacao) {
                $saldoBloqueado = $this->saldoNotaEmpenhoDao->findAllBy(
                    [['COLUMN' => 'operacaoId', 'VALUE' => $operacao->getOperacaoId()]],
                    ['id', 'ASC'],
                    'vw_liminares_saldo_notas_empenho_bloqueadas'
                );

                $saldosEmpenhos = array_merge($saldosEmpenhos, $saldoBloqueado);
            }

            if ($lote->isValid()) {
                $lote->setLiminarId($liminar->getId());
                $this->dao->create($lote);
                $lote = $this->dao->find((string) $lote->getId());

                $createOperacao = function ($saldoEmpenho) use ($lote): LoteDesbloqueioOperacaoDomain {
                    $args = [
                        LoteDesbloqueioOperacaoDomain::OPERACAO_ID => $saldoEmpenho->getOperacaoId(),
                        LoteDesbloqueioOperacaoDomain::DOCUMENTO => $saldoEmpenho->getDocumento(),
                        'saldoContaContabil' => $saldoEmpenho->getSaldo(),
                    ];

                    $operacao = new LoteDesbloqueioOperacaoDomain($args);

                    $operacao
                        ->setLoteDesbloqueioId($lote->getId())
                        ->setSaldo($args['saldoContaContabil']);

                    $this->loteDesbloqueioOperacaoDao->create($operacao);
                    return $operacao;
                };

                $operacoes = array_map($createOperacao, $saldosEmpenhos);

                $this->mail->addAddress(
                    $this->gerentes['gerenciaExecutivaFinanceiraEmail'],
                    $this->gerentes['gerenciaExecutivaFinanceiraEmail']
                );
                $this->mail->addCC(
                    $this->gerentes['gerenciaNacionalOperacaoEmail'],
                    $this->gerentes['gerenciaNacionalOperacao']
                );

                $this->mail->addCC(
                    $this->gerentes['gerenciaExecutivaOperacaoEmail'],
                    $this->gerentes['gerenciaExecutivaOperacaoEmail']
                );

                $this->mail->isHTML(true);                                  // Set email format to HTML
                $this->mail->Subject = <<<SUBJECT
                    {$expediente['tx_identificacao']} - RAP LIMINAR - Solicitação de desbloqueio de empenhos
                     lote {$lote->numero()}
                SUBJECT;

                $this->mail->Body = $this->templates->render(
                    'NewLoteDesbloqueioLiminar.html',
                    [
                        'numero_processo' => $liminar->getNumeroProcesso(),
                        'gerenciaExecutivaFinanceira' => $this->gerentes['gerenciaExecutivaFinanceira'],
                        'numeroLote' => $lote->numero(),
                        'quantidadeDocumentos' => count($operacoes),
                        'gerenteExecutivoOperacao' => $this->gerentes['gerenteExecutivoOperacao'],
                        'gerenciaNacionalOperacao' => $this->gerentes['gerenciaNacionalOperacao'],
                        'gerenteNacionalOperacao' => $this->gerentes['gerenteNacionalOperacao'],
                        'operacoes' => $operacoes,
                    ]
                );

                $this->mail->send();

                // Gerar o arquivo csv
                $folder = realpath($this->container->get('settings')['lotesDesbloqueioFolder'] . "/./{$lote->getAno()}/");
                $csvFilePath = "{$folder}/{$lote->getAno()}_{$lote->getSequencial()}.csv";
                $delimiter = ';';

                $operacoesArquivo = array_map(
                    function ($op) {
                        return $op->jsonSerialize();
                    },
                    $this->loteDesbloqueioFileDao->findAllBy([
                        ['COLUMN' => 'id', 'VALUE' => $lote->getId()]
                    ])
                );

                if (!file_exists($folder) && !mkdir($folder, 777, true) && !is_dir($folder)) {
                    throw new RuntimeException(sprintf('Directory "%s" was not created', $folder));
                }

                $file = fopen($csvFilePath, 'wb');
                fputcsv($file, array_keys((array) $operacoesArquivo[0]), $delimiter);
                foreach ($operacoesArquivo as $param) {
                    fwrite($file, implode($delimiter, $param) . PHP_EOL);
                }
                fclose($file);

                $lote->setFilePath($csvFilePath);
                $lote->setChecksum(md5_file($csvFilePath));
                $this->dao->update($lote);

                $connection->commit();
            }

            $body = json_decode(json_encode($lote), true);
            $body['notasEmpenho'] = count($operacoes);
            $res->getBody()->write(json_encode($body, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_CREATED);
        } catch (Exception $ex) {
            $connection->rollback();
            $res->getBody()->write($ex->getMessage());
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
