<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\InfoDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class InfoController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new InfoDao($this->container);
    }

    public function index(Request $req, Response $res, array $args): Response {
        $info = $this->dao->mostRecent();
        $res->getBody()->write(json_encode($info, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus(self::HTTP_OK);
    }
}