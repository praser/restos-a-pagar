<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\ParametrosDomain;

class ParametrosDao extends DaoBase
{
    use Traits\FindByAnoOrcamentarioTrait;
    use Traits\FindByAnoExecucaoTrait;

    protected const TABLE = 'parametros';
    protected $domain = ParametrosDomain::class;
}
