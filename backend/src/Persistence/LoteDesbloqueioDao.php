<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioDomain;

class LoteDesbloqueioDao extends DaoBase
{
    protected const TABLE = 'vw_lotes_desbloqueio';
    protected $domain = LoteDesbloqueioDomain::class;
}
