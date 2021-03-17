<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\LoteDesbloqueioOperacaoVwDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LoteDesbloqueioOperacoesController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioOperacaoVwDao($container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $ano = $args['anoExecucao'];
        $seq = $args['sequencial'];

        $documentos = $this->dao->findAllBy([
            ['COLUMN' => 'ano', 'VALUE' => $ano],
            ['COLUMN' => 'sequencial', 'VALUE' => $seq]
        ]);
        $res->getBody()->write(json_encode($documentos, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}
