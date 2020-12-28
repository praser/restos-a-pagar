<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\ParametrosDao;
use App\Domain\ParametrosDomain;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ParametrosController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new ParametrosDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $parametros = $this->dao->all();
        $res->getBody()->write(json_encode($parametros, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }

    public function show(Request $req, Response $res, array $args): Response
    {
        $status = self::HTTP_NOT_FOUND;
        $anoOrcamentario = (int) $args[ParametrosDomain::ANO_ORCAMENTARIO];
        $parametros = $this->dao->findByAnoOrcamentario($anoOrcamentario);
        if ($parametros) {
            $res->getBody()->write(json_encode($parametros, JSON_THROW_ON_ERROR, 512));
            $status = self::HTTP_OK;
        }

        return $res->withStatus($status);
    }
}
