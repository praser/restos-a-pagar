<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\LoteDesbloqueioDomain;
use App\Domain\UserDomain;
use App\Persistence\LoteDesbloqueioDao;
use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LotesDesbloqueioController extends ControllerBase
{
    private $dao;

    public function __construct(Container $container)
    {
        parent::__construct($container);
        $this->dao = new LoteDesbloqueioDao($container);
    }

    public function create(Request $req, Response $res, array $args): Response
    {
        $user = new UserDomain(json_decode($req->getAttribute('user'), true));
        $params = $req->getParsedBody();
        $lote = new LoteDesbloqueioDomain();
        $lote
          ->setSequencial(1)
          ->setAno(2020)
          ->setCe('CE GEOTR 9999/2020')
          ->setResponsavelId($user->getRegistration())
          ->setResponsavelNome($user->getName())
          ->setResponsavelUnidadeId($user->getPhysicalLotationId())
          ->setResponsavelUnidadeSigla($user->getPhysicalLotationAbbreviation())
          ->setSituacao('AGUARDANDO PROCESSAMENTO');

        $status = $this->dao->create($lote) ? self::HTTP_CREATED : self::HTTP_INTERNAL_SERVER_ERROR;
        $res->getBody()->write(json_encode($lote, JSON_THROW_ON_ERROR, 512));
        return $res->withStatus($status);
    }
}
