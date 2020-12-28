<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\InfoDomain;

class InfoDao extends DaoBase
{
    protected const TABLE = 'parametros';
    protected $domain = InfoDomain::class;

    public function mostRecent(): ?DomainInterface
    {
        $qb = $this->getQueryBuilder();
        $query = $qb
          ->select('dbo.controle_arquivos')
          ->setColumns([])
          ->setFunctionAsColumn('MAX', array('dataReferencia'), InfoDomain::DATABASE_POSITION)
          ->setFunctionAsColumn('MAX', array('created_at'), InfoDomain::DATABASE_LAST_UPDATE)
          ->where();

        $statment = $this->getConnection()->prepare($qb->write($query->end()));
        $statment->execute($qb->getValues());

        return $this->inflateDomain($statment);
    }
}