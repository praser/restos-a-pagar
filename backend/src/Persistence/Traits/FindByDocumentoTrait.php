<?php

declare(strict_types=1);

namespace App\Persistence\Traits;

use App\Domain\DomainInterface;

trait FindByDocumentoTrait
{
    public function findByDocumento(string $documento): ?DomainInterface
    {
        return $this->findBy([[
          self::COLUMN_KEY => 'documento',
          self::VALUE_KEY => $anoExecucao
        ]]);
    }
}
