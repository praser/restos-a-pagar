<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\UnidadeDomain;

class UnidadeDao extends DaoBase
{
    protected const TABLE = 'cache.unidades';
    protected $domain = UnidadeDomain::class;
}