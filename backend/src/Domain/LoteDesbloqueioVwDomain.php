<?php

namespace App\Domain;

use DateTime;

class LoteDesbloqueioVwDomain extends LoteDesbloqueioDomain
{
    private const EMPENHOS = 'empenhos';

    private $empenhos;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->empenhos = (int) $this->setAttribute(self::EMPENHOS, $params);
    }

    public function getEmpenhos(): ?int
    {
        return $this->empenhos;
    }
    public function setEmpenhos($empenhos): LoteDesbloqueioVwDomain
    {
        $this->empenhos = $empenhos;
        return $this;
    }

    public function jsonSerialize(): array
    {
        $serialization = [
            self::EMPENHOS => $this->getEmpenhos(),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
