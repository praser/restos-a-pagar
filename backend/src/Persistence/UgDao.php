<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\UgDomain;
use Exception;

class UgDao extends DaoBase
{
    protected const TABLE = 'cache.ugs';
    protected $domain = UgDomain::class;

    public function ugsAtivas(int $anoExecucao): ?array
    {
        try {
            $qb = $this->getQueryBuilder();
            $query = $qb
                ->select()
                ->setTable(self::TABLE)
                ->setColumns([UgDomain::SIGLA_GESTOR, UgDomain::NOME_GESTOR])
                ->groupBy([UgDomain::SIGLA_GESTOR, UgDomain::NOME_GESTOR])
                ->orderBy(UgDomain::SIGLA_GESTOR, self::ASC);

            $statment = $this->getConnection()->prepare($qb->write($query));
            $statment->execute($qb->getValues());

            return $this->inflateDomains($statment);
        } catch(Exception $ex) {
            $this->exceptionHandler($ex);
        }

        return null;
    }

    public function findAllGestoresUgsAtivas(): ?array
    {
        $columns = [ UgDomain::SIGLA_GESTOR, UgDomain::NOME_GESTOR ];
        $queryBuilder = $this->getQueryBuilder();
        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($columns)
            ->groupBy($columns)
            ->orderBy(UgDomain::SIGLA_GESTOR, self::ASC);

        try {
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
    }
}
