<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LiminarOperacaoDomain;

class LiminarOperacaoDao extends DaoBase
{
    protected const TABLE = 'liminar_operacoes';
    protected $domain = LiminarOperacaoDomain::class;
}
