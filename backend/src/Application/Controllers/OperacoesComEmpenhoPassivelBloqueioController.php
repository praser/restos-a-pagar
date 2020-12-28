<?php

namespace App\Application\Controllers;

use App\Domain\EstatisticasPreBloqueioDomain;
use App\Domain\OperacaoDomain;
use App\Persistence\OperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class OperacoesComEmpenhoPassivelBloqueioController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new OperacaoDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = (int) $args[OperacaoDomain::ANO_EXECUCAO];
        $tipoInformacaoId = array_key_exists('tipoInfo', $req->getQueryParams()) ? (int) $req->getQueryParams()['tipoInfo'] : 3;
        $unidadeId = array_key_exists('unidadeId', $req->getQueryParams()) ? (int) $req->getQueryParams()['unidadeId'] : null;
        $siglaGestor = array_key_exists('siglaGestor', $req->getQueryParams()) ? (string) $req->getQueryParams()['siglaGestor'] : null;

        $operacoes = $this->dao->operacoesComNotasEmpenhoPassiveisBloqueio($tipoInformacaoId, $anoExecucao, $unidadeId, $siglaGestor);
        if ($operacoes) {
            $res->getBody()->write(json_encode($operacoes, JSON_THROW_ON_ERROR, 512));
            return $res->withStatus(self::HTTP_OK);
        }

        return $res->withStatus(self::HTTP_NOT_FOUND);
    }
}
