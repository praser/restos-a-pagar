<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\LoteDesbloqueioFileDomain;

class LoteDesbloqueioFileDao extends DaoBase
{
    protected const TABLE = 'vw_lote_desbloqueio_file';
    protected $domain = LoteDesbloqueioFileDomain::class;
}
