<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LiminarDomain;

class LiminarDao extends DaoBase
{
    protected const TABLE = 'liminares';
    protected $domain = LiminarDomain::class;
}
