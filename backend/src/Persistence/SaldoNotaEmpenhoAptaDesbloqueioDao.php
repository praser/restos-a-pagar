<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\SaldoNotaEmpenhoDomain;
use Exception;

class SaldoNotaEmpenhoAptaDesbloqueioDao extends SaldoNotaEmpenhoDao
{
    use Traits\FindByAnoOrcamentarioTrait;

    protected const TABLE = 'vw_saldo_notas_empenho_aptas_desbloqueio';
    protected $domain = SaldoNotaEmpenhoDomain::class;
}
