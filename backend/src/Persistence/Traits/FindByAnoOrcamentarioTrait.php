<?php

declare(strict_types=1);

namespace App\Persistence\Traits;

use App\Domain\DomainInterface;

trait FindByAnoOrcamentarioTrait
{
  public function findByAnoOrcamentario(int $anoOrcamentario): ?DomainInterface
  {
      return $this->findBy($this->anoOrcamentarioParams($anoOrcamentario));
  }

  public function findAllByAnoOrcamentario(int $anoOrcamentario): ?array
  {
    return $this->findAllBy($this->anoOrcamentarioParams($anoOrcamentario));
  }

  private function anoOrcamentarioParams($anoOrcamentario): array
  {
    return [[
      self::COLUMN_KEY => 'anoOrcamentario',
      self::VALUE_KEY => $anoOrcamentario
    ]];
  }
}