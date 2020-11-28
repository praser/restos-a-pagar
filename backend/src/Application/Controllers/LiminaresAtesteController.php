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

class LiminaresAtesteController extends ControllerBase
{
    use Traits\CurrentUserTrait;

    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->container = $this->container;
        $this->dao = new LiminarDao($this->container);
    }

    public function update(Request $req, Response $res, array $args): Response
    {
        $currentUser = $this->getCurrentUser($req);
        $id = (int) $args['id'];
        $liminar = $this->dao->find((string) $id);
        $liminar->setResponsavelAteste($currentUser);
        $liminar->unsetEmpenhosBloqueados();

        try {
            $this->dao->update($liminar);
        } catch (\Throwable $th) {
            $res->getBody()->write($th->getMessage());
            return $res->withStatus(self::HTTP_INTERNAL_SERVER_ERROR);
        }
        return $res->withStatus(self::HTTP_OK);
    }
}
