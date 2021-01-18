<?php

namespace App\Application\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Exception;
use Psr\Log\LoggerInterface;

abstract class ControllerBase implements ControllerInterface
{
    protected const HTTP_OK = 200;
    protected const HTTP_CREATED = 201;
    protected const HTTP_NO_CONTENT = 204;
    protected const HTTP_NOT_FOUND = 404;
    protected const HTTP_INTERNAL_SERVER_ERROR = 500;

    protected $container;
    protected $repository;
    protected $logger;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->logger = $this->container->get(LoggerInterface::class);
    }

    public function index(Request $req, Response $res, array $args): Response
    {
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }

    public function show(Request $req, Response $res, array $args): Response
    {
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }

    public function update(Request $req, Response $res, array $args): Response
    {
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }

    public function destroy(Request $req, Response $res, array $args): Response
    {
        return $res->withStatus(self::HTTP_NOT_FOUND);
    }

    protected function errorHandler(Exception $ex): void
    {
        $this->logger->error($ex->getMessage());
    }
}
