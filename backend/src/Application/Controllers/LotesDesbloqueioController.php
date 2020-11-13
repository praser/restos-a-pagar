<?php
/** @noinspection PhpUnused */

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
use Exception;

class LotesDesbloqueioController extends ControllerBase
{
    private $dao;
    private $loteDesbloqueioOperacaoDao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
        $this->loteDesbloqueioOperacaoDao = new LoteDesbloqueioOperacaoDao($container);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $user = new UserDomain(json_decode($req->getAttribute('user'), true));
        $params = $req->getParsedBody();
        $lote = new LoteDesbloqueioDomain();
        $lote
          ->setCe('CE GEOTR 9999/2020')
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
                
                $createOperacao = function($param) use($lote): LoteDesbloqueioOperacaoDomain
                {
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
