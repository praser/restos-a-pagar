<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\UgDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UgGestoresController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new UgDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $ugGestores = $this->dao->findAllGestoresUgsAtivas();
        $res->getBody()->write(json_encode($ugGestores, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}