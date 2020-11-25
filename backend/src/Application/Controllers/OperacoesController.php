<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Persistence\OperacaoDao;

class OperacoesController extends ControllerBase
{
  private $dao;

  public function __construct(Container $container)
  {
    parent::__construct($container);
    $this->dao = new OperacaoDao($this->container);
  }

  public function index(Request $req, Response $res, array $args): Response
  {
    $operacoes = $this->dao->all();
    $res->getBody()->write(json_encode($operacoes, JSON_THROW_ON_ERROR, 512));
    return $res->withStatus(self::HTTP_OK);
  }
}