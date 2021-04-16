<?php

namespace App\Domain;

use DateTime;

class LoteDesbloqueioOperacaoVwDomain extends LoteDesbloqueioOperacaoDomain
{
    private const OPERACAO = 'operacao';
    private const CONVENIO = 'convenio';

    private $operacao;
    private $convenio;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->operacao = (int) $this->setAttribute(self::OPERACAO, $params);
        $this->convenio = (int) $this->setAttribute(self::CONVENIO, $params);
    }

    public function getOperacao(): ?int
    {
        return $this->operacao;
    }

    public function setOperacao(int $operacao): LoteDesbloqueioOperacaoVwDomain
    {
        $this->operacao = $operacao;
        return $this;
    }

    public function getConvenio(): ?int
    {
        return $this->convenio;
    }

    public function setConvenio(int $convenio): LoteDesbloqueioOperacaoVwDomain
    {
        $this->convenio = $convenio;
        return $this;
    }

    public function jsonSerialize(): array
    {
        $serialization = [
            self::OPERACAO => $this->getOperacao(),
            self::CONVENIO => $this->getConvenio(),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
