<?php

declare(strict_types=1);

namespace App\Persistence\Traits;

use App\Domain\DomainInterface;

trait FindByAnoExecucaoTrait
{
  public function findByAnoExecucao(int $anoExecucao): ?DomainInterface
  {
      return $this->findBy($this->anoExecucaoParams($anoExecucao));
  }

  public function findAllByAnoExecucao(int $anoExecucao): ?array
  {
    return $this->findAllBy($this->anoExecucaoParams($anoExecucao));
  }

  private function anoExecucaoParams($anoExecucao): array
  {
    return [[
      self::COLUMN_KEY => 'anoExecucao',
      self::VALUE_KEY => $anoExecucao
    ]];
  }
}