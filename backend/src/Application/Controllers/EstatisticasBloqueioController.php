<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\EstatisticasBloqueioDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EstatisticasBloqueioController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new EstatisticasBloqueioDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response {
        $anoExecucao = (int) $args['anoExecucao'];

        $estatisticas = $this->dao->findByAnoExecucao($anoExecucao);

        if($estatisticas) {
            $responseBody = [
                'estatisticas' => $estatisticas
            ];

            $res->getBody()->write(json_encode($responseBody, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_OK);
        }
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }
}