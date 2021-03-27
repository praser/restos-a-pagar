<?php

namespace App\Domain;

class LoteDesbloqueioFileDomain extends DomainBase
{
    private const LOTE = 'lote';
    private const UG = 'ug';
    private const TOMADOR = 'tomador';
    private const UF = 'uf';
    private const PROPOSTA = 'proposta';
    private const CONVENIO = 'convenio';
    private const DOCUMENTO = 'documento';
    private const VALOR_BLOQUEADO = 'valorBloqueado';
    private const PERCENTUAL_FISICO_AFERIDO = 'percentualFisicoAferido';
    private const TIPO = 'tipo';

    private $lote;
    private $ug;
    private $tomador;
    private $uf;
    private $proposta;
    private $convenio;
    private $documento;
    private $valorBloqueado;
    private $percentualFisicoAferido;
    private $tipo;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->lote = $this->setAttribute(self::LOTE, $params);
        $this->ug = $this->setAttribute(self::UG, $params);
        $this->tomador = $this->setAttribute(self::TOMADOR, $params);
        $this->uf = $this->setAttribute(self::UF, $params);
        $this->proposta = (int) $this->setAttribute(self::PROPOSTA, $params);
        $this->convenio = (int) $this->setAttribute(self::CONVENIO, $params);
        $this->documento = $this->setAttribute(self::DOCUMENTO, $params);
        $this->valorBloqueado = (float) $this->setAttribute(self::VALOR_BLOQUEADO, $params);
        $this->percentualFisicoAferido = (float) $this->setAttribute(self::PERCENTUAL_FISICO_AFERIDO, $params);
        $this->tipo = $this->setAttribute(self::TIPO, $params);
    }

    public function jsonSerialize(): array
    {
        return [
            self::LOTE => $this->lote,
            self::UG => $this->ug,
            self::TOMADOR => $this->tomador,
            self::UF => $this->uf,
            self::PROPOSTA => $this->proposta,
            self::CONVENIO => $this->convenio,
            self::DOCUMENTO => $this->documento,
            self::VALOR_BLOQUEADO => $this->valorBloqueado,
            self::PERCENTUAL_FISICO_AFERIDO => $this->percentualFisicoAferido,
            self::TIPO => $this->tipo,
        ];
    }
}
