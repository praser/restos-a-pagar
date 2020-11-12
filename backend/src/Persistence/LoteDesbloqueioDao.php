<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioDomain;

class LoteDesbloqueioDao extends DaoBase
{
    protected const TABLE = 'lotes_desbloqueio';
    protected $domain = LoteDesbloqueioDomain::class;
}
