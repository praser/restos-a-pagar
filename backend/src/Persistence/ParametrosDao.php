<?php

/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\ParametrosDomain;

class ParametrosDao extends DaoBase
{
    protected const TABLE = 'parametros';
    protected $domain = ParametrosDomain::class;

    public function findByAnoExecucao(int $anoExecucao): ?DomainInterface
    {
        return $this->findBy([[
            self::COLUMN_KEY => ParametrosDomain::ANO_EXECUCAO,
            self::VALUE_KEY => $anoExecucao
        ]]);
    }
}