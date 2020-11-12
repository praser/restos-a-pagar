<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Persistence\EstatisticasBloqueioSnapshotDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EstatisticasBloqueioSnapshotController extends EstatisticasBloqueioController
{
    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new EstatisticasBloqueioSnapshotDao($this->container);
    }
}