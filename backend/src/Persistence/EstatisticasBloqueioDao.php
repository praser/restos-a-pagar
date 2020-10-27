<?php
/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\EstatisticasBloqueioDomain;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;

class EstatisticasBloqueioDao extends DaoBase
{
    protected const TABLE = 'cache.estatisticas_bloqueio';
    protected $domain = EstatisticasBloqueioDomain::class;

    public function findByAnoExecucao(int $anoExecucao): ?array
    {
        try {
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder
                ->select(self::TABLE)
                ->where()
                ->equals(EstatisticasBloqueioDomain::ANO_EXECUCAO, $anoExecucao);
            
            $statment = $this->getConnection()->prepare($queryBuilder->write($query->end()));
            return $this->inflateDomains($statment);
        } catch(Exception $ex) {
            $this->exceptionHander($ex);
        }
    }    
}
