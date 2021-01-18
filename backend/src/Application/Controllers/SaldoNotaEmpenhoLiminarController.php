<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\SaldoNotaEmpenhoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use RuntimeException;

class SaldoNotaEmpenhoLiminarController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new SaldoNotaEmpenhoDao($container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $saldosNotasEmpenho = $this->dao->findAllBy(
            [['COLUMN' => 'liminarId', 'VALUE' => $args['id']]],
            ['id', 'ASC'],
            'vw_liminares_saldo_notas_empenho_bloqueadas'
        );

        $res->getBody()->write(json_encode($saldosNotasEmpenho, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}
