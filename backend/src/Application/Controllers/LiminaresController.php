<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LiminarDomain;
use App\Domain\LiminarOperacaoDomain;
use App\Persistence\LiminarDao;
use App\Persistence\LiminarOperacaoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LiminaresController extends ControllerBase
{
    use Traits\CurrentUserTrait;

    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->container = $this->container;
        $this->dao = new LiminarDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        $liminares = $this->dao->all(['id', 'ASC'], 'vw_liminares');
        $res->getBody()->write(json_encode($liminares, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $currentUser = $this->getCurrentUser($req);
        $liminarOperacaoDao = new LiminarOperacaoDao($this->container);
        $params = $req->getParsedBody();
        $liminar = new LiminarDomain($params);
        $liminar->setResponsavelCadastramento($currentUser);
        $conn = $this->dao->getConnection();

        $conn->beginTransaction();
        try {
            $this->dao->create($liminar);
            array_map(function ($operacaoId) use ($liminarOperacaoDao, $liminar) {
                $liminarOperacao = new LiminarOperacaoDomain();
                $liminarOperacao->setLiminarId($liminar->getId());
                $liminarOperacao->setOperacaoId($operacaoId);
                $liminarOperacaoDao->create($liminarOperacao);
            }, $params['operacoes']);
            $conn->commit();
        } catch (\Throwable $th) {
            $conn->rollback();
            $res->getBody()->write($th->getMessage());
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
        

        return $res->withStatus(self::HTTP_CREATED);
    }
}
