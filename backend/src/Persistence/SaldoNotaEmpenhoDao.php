<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\SaldoNotaEmpenhoDomain;
use Exception;

class SaldoNotaEmpenhoDao extends DaoBase
{
    protected const TABLE = 'saldos_notas_empenhos';
    protected $domain = SaldoNotaEmpenhoDomain::class;

    public function aptasDesbloqueio(int $anoOrcamentario): ?array
    {
        $table = 'cache.saldo_notas_empenho_aptas_desbloqueio';
        return $this->queryCache($table, $anoOrcamentario);
    }

    private function queryCache(string $table, int $anoOrcamentario): ?array
    {
        try {
            $qb = $this->getQueryBuilder();
            $query = $qb
                ->select($table)
                ->where()
                ->equals(SaldoNotaEmpenhoDomain::ANO_ORCAMENTARIO, $anoOrcamentario);

            $statment = $this->getConnection()->prepare($qb->write($query->end()));
            $statment->execute($qb->getValues());

            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }

        return null;
    }
}
