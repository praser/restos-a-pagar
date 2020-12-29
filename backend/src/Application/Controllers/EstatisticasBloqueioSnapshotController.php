<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\EstatisticasBloqueioSnapshotDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EstatisticasBloqueioSnapshotController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new EstatisticasBloqueioSnapshotDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = (int) $args['anoExecucao'];
        
        $tipoInformacaoId = array_key_exists('tipoInfo', $req->getQueryParams())
            ? (int) $req->getQueryParams()['tipoInfo']
            : 3;
        
        $unidadeId = array_key_exists('unidadeId', $req->getQueryParams())
            ? (int) $req->getQueryParams()['unidadeId']
            : null;
        
        $gestorSigla = array_key_exists('siglaGestor', $req->getQueryParams())
            ? (string) $req->getQueryParams()['siglaGestor']
            : null;
        
        $estatisticas = $this->dao->findByAnoExecucao($anoExecucao, $tipoInformacaoId, $unidadeId, $gestorSigla);

        if ($estatisticas) {
            $responseBody = [
                'estatisticas' => $estatisticas
            ];

            $res->getBody()->write(json_encode($responseBody, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_OK);
        }
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }
}
