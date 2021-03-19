<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioVwDomain;

class LoteDesbloqueioVwDao extends DaoBase
{
    protected const TABLE = 'vw_lotes_desbloqueio';
    protected $domain = LoteDesbloqueioVwDomain::class;
}
