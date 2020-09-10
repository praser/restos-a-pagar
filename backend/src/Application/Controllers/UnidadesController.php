<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\UnidadeDomain;
use App\Persistence\UnidadeDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UnidadesController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new UnidadeDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $unidades = $this->dao->all([UnidadeDomain::NOME, UnidadeDao::ASC]);
        $res->getBody()->write(json_encode($unidades, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}