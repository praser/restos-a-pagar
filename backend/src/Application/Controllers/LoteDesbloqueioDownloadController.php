<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\LoteDesbloqueioDao;
use Exception;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LoteDesbloqueioDownloadController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        $this->dao = new LoteDesbloqueioDao($container);
    }

    public function show(Request $req, Response $res, array $args): Response
    {
        //TODO: Quando for gravar no log checar se o jwt é válido
        $jwt = $req->getQueryParams()['jwt'];
        $loteId = $req->getQueryParams()['loteId'];

        if (!$jwt) {
            return $res->withStatus(self::HTTP_UNAUTHORIZED);
        }

        try {
            $loteDesbloqueio = $this->dao->find($loteId);
            $filePath = $loteDesbloqueio->getFilePath();
            $response = $res
            ->withHeader('Content-Type', 'application/octet-stream')
            ->withHeader('Content-Disposition', 'attachment; filename=' . basename($filePath))
            ->withAddedHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->withHeader('Cache-Control', 'post-check=0, pre-check=0')
            ->withHeader('Pragma', 'no-cache')
            ->withBody((new \Slim\Psr7\Stream(fopen($filePath, 'rb'))));

            return $response;
        } catch (Exception $ex) {
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
