<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\SaldoNotaEmpenhoDomain;
use App\Persistence\SaldoNotaEmpenhoAptaDesbloqueioDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class SaldoNotasEmpenhoAptasDesbloqueioController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new SaldoNotaEmpenhoAptaDesbloqueioDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoOrcamentario = (int) $args[SaldoNotaEmpenhoDomain::ANO_ORCAMENTARIO];

        $saldosNotasEmpenho = $this->dao->findAllByAnoOrcamentario($anoOrcamentario);
        if ($saldosNotasEmpenho) {
            $res->getBody()->write(json_encode($saldosNotasEmpenho, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_OK);
        }

        return $res->withStatus(self::HTTP_NOT_FOUND);
    }
}
