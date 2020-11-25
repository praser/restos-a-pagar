<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LiminarDomain;
use App\Persistence\LiminarDao;
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
        $this->dao = new LiminarDao($container);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $currentUser = $this->getCurrentUser($req);
        $params = $req->getParsedBody();
        $liminar = new LiminarDomain($params);
        $liminar->setResponsavelCadastramento($currentUser);
        $this->dao->create($liminar);
        return $res->withStatus(self::HTTP_CREATED);
    }
}
