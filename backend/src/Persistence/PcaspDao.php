<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\PcaspDomain;

class PcaspDao extends DaoBase
{
    protected const TABLE = 'pcasp';
    protected $domain = PcaspDomain::class;
}
