<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioOperacaoVwDomain;

class LoteDesbloqueioOperacaoVwDao extends DaoBase
{
    protected const TABLE = 'vw_lote_desbloqueio_operacoes';
    protected $domain = LoteDesbloqueioOperacaoVwDomain::class;
}
