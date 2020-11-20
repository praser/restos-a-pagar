<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\EstatisticasPreBloqueioDomain;
use App\Persistence\EstatisticasPreBloqueioDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TipoInformacaoController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new EstatisticasPreBloqueioDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = (int) $args[EstatisticasPreBloqueioDomain::ANO_EXECUCAO];
        $tiposInformacoes = $this->dao->findAllTipoInformacao($anoExecucao);
        $res->getBody()->write(json_encode($tiposInformacoes, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }


}