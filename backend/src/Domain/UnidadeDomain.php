<?php

declare(strict_types=1);

namespace App\Domain;

class UnidadeDomain extends DomainBase
{
    public const NOME = 'nome';

    private $nome;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->nome = (string) $this->setAttribute(self::NOME, $params);
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function jsonSerialize()
    {
        $serialized = array(self::NOME => $this->getNome());
        return array_merge(parent::jsonSerialize(), $serialized);
    }
}
