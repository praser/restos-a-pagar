<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Persistence\SituacaoEmpenhoDao;
use App\Domain\EmpenhoDomain;

class EmpenhosDesbloqueiosController extends ControllerBase
{

    private $dao;
    private const ANO_EXECUCAO_KEY = 'anoExecucao';
    private const SITUACAO_KEY = 'situacao';

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new SituacaoEmpenhoDao($container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = (int) $args[EmpenhosDesbloqueiosController::ANO_EXECUCAO_KEY];
        $situacao = $req->getQueryParams()[EmpenhosDesbloqueiosController::SITUACAO_KEY];
        $empenhos = $this->dao->findBySituacao($anoExecucao, $situacao);
        $empenhos = $empenhos ? $empenhos : [];
        $res->getBody()->write(json_encode($empenhos, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}
