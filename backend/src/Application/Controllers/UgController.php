<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\UgDomain;
use App\Persistence\UgDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UgController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new UgDao($container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $ugs = $this->dao->all();
        $res->getBody()->write(json_encode(['ug' => $ugs], JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }

    public function show(Request $req, Response $res, array $args): Response
    {
        $status = self::HTTP_NOT_FOUND;
        $ug = $this->dao->find($args[UgDomain::ID]);
        if ($ug) {
            $res->getBody()->write(json_encode($ug, JSON_THROW_ON_ERROR, 512));
            $status = self::HTTP_OK;
        }

        return $res->withStatus($status);
    }


    public function create(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody();
        $ug = new UgDomain($params['ug']);

        $status = $this->dao->create($ug) ? self::HTTP_CREATED : self::HTTP_INTERNAL_SERVER_ERROR;
        return $res->withStatus($status);
    }

    public function update(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody()['ug'];
        $ug = $this->dao->find($args[UgDomain::ID]);
        if ($ug) {
            !array_key_exists(UgDomain::CODIGO, $params) ?: $ug->setCodigo((int) $params[UgDomain::CODIGO]);
            !array_key_exists(UgDomain::NOME, $params) ?: $ug->setNome($params[UgDomain::NOME]);
            !array_key_exists(UgDomain::NOME_GESTOR, $params) ?: $ug->setNomeGestor($params[UgDomain::NOME_GESTOR]);
            !array_key_exists(UgDomain::SIGLA_GESTOR, $params) ?: $ug->setSiglaGestor($params[UgDomain::SIGLA_GESTOR]);

            if ($this->dao->update($ug)) {
                $res->getBody()->write(json_encode($ug, JSON_THROW_ON_ERROR, 512));
                return $res->withStatus(self::HTTP_OK);
            }

            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $res->withStatus(self::HTTP_NOT_FOUND);
    }


    public function destroy(Request $req, Response $res, array $args): Response
    {
        $ug = $this->dao->find($args[UgDomain::ID]);
        if (!$ug) {
            return $res->withStatus(self::HTTP_NOT_FOUND);
        }
        if (!$this->dao->delete($ug)) {
            $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $res->withStatus(self::HTTP_NO_CONTENT);
    }

    public function distintas(Request $req, Response $res, array $args): Response
    {
        $anoExecucao = (int) $args['anoExecucao'];
        $ugs = $this->dao->ugsAtivas($anoExecucao);
        $res->getBody()->write(json_encode($ugs, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}
