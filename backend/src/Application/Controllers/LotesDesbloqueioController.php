<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LoteDesbloqueioDomain;
use App\Domain\LoteDesbloqueioOperacaoDomain;
use App\Domain\UserDomain;
use App\Persistence\LoteDesbloqueioDao;
use App\Persistence\LoteDesbloqueioOperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\ExpedienteGovService;
use Exception;

class LotesDesbloqueioController extends ControllerBase
{
    private $dao;
    private $loteDesbloqueioOperacaoDao;
    private $expedienteGovService;
    private $mail;
    private $templates;
    private $gerentes;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
        $this->loteDesbloqueioOperacaoDao = new LoteDesbloqueioOperacaoDao($container);
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

        $params = $req->getParsedBody();
        $expediente = $this->expedienteGovService->create($jwt, array(
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
                $this->dao->create($lote);
                $lote = $this->dao->find((string) $lote->getId());
                
                $createOperacao = function ($param) use ($lote): LoteDesbloqueioOperacaoDomain {
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
                    
                    $this->loteDesbloqueioOperacaoDao->create($operacao);
                    array_push($lote->notasEmpenho, $operacao->getDocumento());
                    return $operacao;
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
                        'quantidadeDocumentos' => $lote->quantidadeNotasEmpenho(),
                        'gerenteExecutivoOperacao' => $this->gerentes['gerenteExecutivoOperacao'],
                        'gerenciaNacionalOperacao' => $this->gerentes['gerenciaNacionalOperacao'],
                        'gerenteNacionalOperacao' => $this->gerentes['gerenteNacionalOperacao'],
                    ]
                );

                $this->mail->send();

                $connection->commit();
            }
            
            $res->getBody()->write(json_encode($lote, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_CREATED);
        } catch (Exception $ex) {
            $connection->rollback();
            $res->getBody()->write($ex->getMessage());
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
