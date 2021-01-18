<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\ControleArquivoDomain;

class ControleArquivoDao extends DaoBase
{
    protected const TABLE = 'controle_arquivos';
    protected $domain = ControleArquivoDomain::class;
}
