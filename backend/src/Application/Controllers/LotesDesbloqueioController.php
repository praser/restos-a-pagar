<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LoteDesbloqueioDomain;
use App\Domain\LoteDesbloqueioOperacaoDomain;
use App\Persistence\LoteDesbloqueioDao;
use App\Persistence\LoteDesbloqueioVwDao;
use App\Persistence\LoteDesbloqueioOperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ExpedienteGovService;
use Exception;
use RuntimeException;

class LotesDesbloqueioController extends ControllerBase
{
    use Traits\CurrentUserTrait;

    private $dao;
    private $loteDesbloqueioVwDao;
    private $loteDesbloqueioOperacaoDao;
    private $expedienteGovService;
    private $mail;
    private $templates;
    private $gerentes;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
        $this->loteDesbloqueioVwDao = new LoteDesbloqueioVwDao($container);
        $this->loteDesbloqueioOperacaoDao = new LoteDesbloqueioOperacaoDao($container);
        $this->expedienteGovService = new ExpedienteGovService($container);
        $this->mail = $container->get('mailer');
        $this->templates = $container->get('templates');
        $this->gerentes = $container->get('settings')['managers'];
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = $args['anoExecucao'];
        $lotesDesbloqueio = $this->loteDesbloqueioVwDao->findAllBy([
            ['COLUMN' => 'ano', 'VALUE' => $anoExecucao]
        ]);
        $res->getBody()->write(json_encode($lotesDesbloqueio, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }

    public function show(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = $args['anoExecucao'];
        $sequencial = $args['sequencial'];
        $loteDesbloqueio = $this->loteDesbloqueioVwDao->findBy([
            ['COLUMN' => 'ano', 'VALUE' => $anoExecucao],
            ['COLUMN' => 'sequencial', 'VALUE' => $sequencial],
        ]);
        $res->getBody()->write(json_encode($loteDesbloqueio, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $token = $this->getToken($req);
        $user = $this->getCurrentUser($req);

        $params = $req->getParsedBody();
        $expediente = $this->expedienteGovService->create($token, array(
            "expediente" => array(
                "co_tipo" => "CE",
                "tx_assunto" => "RAP - Lote de desbloqueio",
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
            if ($lote->isValid()) {
                $this->dao->create($lote, 'lotes_desbloqueio');
                $lote = $this->dao->find((string) $lote->getId());

                $createOperacao = function ($param) use ($lote): array {
                    $p = array_intersect_key(
                        $param,
                        array_flip(
                            array(
                                LoteDesbloqueioOperacaoDomain::OPERACAO_ID,
                                LoteDesbloqueioOperacaoDomain::DOCUMENTO,
                                'saldoContaContabil',
                            )
                        )
                    );
                    $operacao = new LoteDesbloqueioOperacaoDomain($p);
                    $operacao
                        ->setLoteDesbloqueioId($lote->getId())
                        ->setSaldo($p['saldoContaContabil']);

                    $this->loteDesbloqueioOperacaoDao->create($operacao, 'lote_desbloqueio_operacoes');
                    return (array) json_decode(json_encode($operacao));
                };

                $operacoes = array_map($createOperacao, $params);

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
                    {$expediente['tx_identificacao']} - RAP - Solicitação de desbloqueio de empenhos 
                    lote {$lote->numero()}
                SUBJECT;

                $this->mail->Body = $this->templates->render(
                    'NewLoteDesbloqueio.html',
                    [
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

                if (!file_exists($folder) && !mkdir($folder, 777, true) && !is_dir($folder)) {
                    throw new RuntimeException(sprintf('Directory "%s" was not created', $folder));
                }

                $file = fopen($csvFilePath, 'wb');
                fputcsv($file, array_keys((array) $operacoes[0]), $delimiter);
                foreach ($operacoes as $param) {
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
