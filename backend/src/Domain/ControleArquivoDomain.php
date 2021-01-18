<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class ControleArquivoDomain extends DomainBase
{
    public const UUID = 'uuid';
    public const MATRICULA = 'matricula';
    public const DATA_REFERENCIA =  'dataReferencia';
    public const ARQUIVO = 'arquivo';

    private $uuid;
    private $matricula;
    private $dataReferencia;
    private $arquivo;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->uuid = (string) $this->setAttribute(self::UUID, $params);
        $this->matricula = (string) $this->setAttribute(self::MATRICULA, $params);
        $this->dataReferencia = $this->parseDateTime($params[self::DATA_REFERENCIA], self::DATE_Y_M_D);
        $this->arquivo = (string) $this->setAttribute(self::ARQUIVO, $params);
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function getMatricula(): ?string
    {
        return $this->matricula;
    }

    public function getDataReferencia(): ?DateTime
    {
        return $this->dataReferencia;
    }

    public function getArquivo(): ?string
    {
        return $this->arquivo;
    }

    public function setArquivo(string $arquivo): void
    {
        $this->arquivo = $arquivo;
    }

    public function jsonSerialize()
    {
        $serialized = [
            self::UUID => $this->getUuid(),
            self::MATRICULA => $this->getMatricula(),
            self::DATA_REFERENCIA => $this->dateTimeToString($this->getDataReferencia()),
            self::ARQUIVO => $this->getArquivo()
        ];
        return array_merge(parent::jsonSerialize(), $serialized);
    }
}
