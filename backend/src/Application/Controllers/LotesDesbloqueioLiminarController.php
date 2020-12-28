<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LoteDesbloqueioDomain;
use App\Domain\LoteDesbloqueioOperacaoDomain;
use App\Domain\UserDomain;
use App\Persistence\LoteDesbloqueioDao;
use App\Persistence\LoteDesbloqueioOperacaoDao;
use App\Persistence\SaldoNotaEmpenhoDao;
use App\Persistence\LiminarDao;
use App\Persistence\LiminarOperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ExpedienteGovService;

class LotesDesbloqueioLiminarController extends ControllerBase
{
    private $dao;
    private $loteDesbloqueioOperacaoDao;
    private $liminarDao;
    private $liminarOperacaoDao;
    private $saldoNotaEmpenhoDao;
    private $expedienteGovService;
    private $mail;
    private $gerentes;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
        $this->liminarDao = new LiminarDao($container);
        $this->liminarOperacaoDao = new LiminarOperacaoDao($container);
        $this->loteDesbloqueioOperacaoDao = new LoteDesbloqueioOperacaoDao($container);
        $this->saldoNotaEmpenhoDao = new SaldoNotaEmpenhoDao($container);
        $this->expedienteGovService = new ExpedienteGovService($container);
        $this->mail = $container->get('mailer');
        $this->gerentes = $container->get('settings')['managers'];
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $currentUser = $req->getAttributes('user')['user'];
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
                    array_push($lote->notasEmpenho, $operacao->getDocumento());
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
                $this->mail->Subject = "{$expediente['tx_identificacao']} - RAP LIMINAR - Solicitação de desbloqueio de empenhos lote {$lote->numero()}";
                $this->mail->Body = <<<HTML
                    À
                    <br>{$this->gerentes['gerenciaExecutivaFinanceira']}
                    <br>
                    <br>Senhor(a) Gerente,
                    <br><br>
                    <ol>
                    <li>Comunicamos que nesta data geramos o lote {$lote->numero()} que contém {$lote->quantidadeNotasEmpenho()} notas de empenho que tiveram o seu saldo bloqueado no RAP deste ano e que atendem aos critérios estabelecidos para o desbloqueio.</li>
                    <br>
                    <li>Pedimos que esta gerência proceda com a operacionalização dos desbloqueios a fim de evitar o cancelamento dos saldos emepenhados nestas notas.</li>
                    <br>
                    <li>As informações detalhadas para o processamento do lote estão disponíveis no endereço <a htrf='http://sudep.mz.caixa/sistemas/restos-a-pagar'>http://sudep.mz.caixa/sistemas/restos-a-pagar</a> onde também é possível fazer o donwload dos dados.</li>
                    <br>
                    <li>Pedimos ainda que o retorno informando sobre os desbloqueios das notas de empenho seja feito através do painel de gestão dos restos a pagar.</li>
                    <br>
                    <li>Certos da costumeira colaboração antecipamos os agradecimentos e permanecemos à disposição.</li>
                    </ol>
                    <br>Atenciosamente,
                    <br>
                    <br><b>{$this->gerentes['gerenteExecutivoOperacao']}</b>
                    <br>Gerente Executivo
                    <br>{$this->gerentes['gerenciaNacionalOperacao']}
                    <br>
                    <br><b>{$this->gerentes['gerenteNacionalOperacao']}</b>
                    <br>Gerente Nacional
                    <br>{$this->gerentes['gerenciaNacionalOperacao']}
                HTML;

                $this->mail->send();

                $connection->commit();
            }
            
            $res->getBody()->write(json_encode($lote, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_CREATED);
        } catch (Exception $Ex) {
            $connection->rollback();
            $res->getBody()->write($th->getMessage());
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
