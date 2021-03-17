<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioOperacaoDomain;

class LoteDesbloqueioOperacaoDao extends DaoBase
{
    protected const TABLE = 'lote_desbloqueio_operacoes';
    protected $domain = LoteDesbloqueioOperacaoDomain::class;
}
