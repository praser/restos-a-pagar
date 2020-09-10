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
}
