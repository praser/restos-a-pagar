<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class EstatisticasBloqueioDomain extends DomainBase
{
    public const ANO_EXECUCAO = 'anoExecucao';
    private const DATA = 'data';
    private const QUANTIDADE_OPERACOES = 'quantidadeOperacoes';
    private const QUANTIDADE_DOCUMENTOS = 'quantidadeDocumentos';
    private const SALDO_BLOQUEADO = 'saldoBloqueado';
    private const SALDO_DESBLOQUEADO = 'saldoDesbloqueado';
    private const SALDO_AGUARDANDO_DESBLOQUEIO = 'saldoAguardandoDesbloqueio';

    private $anoExecucao;
    private $data;
    private $quantidadeOperacoes;
    private $quantidadeDocumentos;
    private $saldoBloqueado;
    private $saldoDesbloqueado;
    private $saldoAguardandoDesbloqueio;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->anoExecucao = (int) $this->setAttribute(self::ANO_EXECUCAO, $params);
        $this->data = $this->parseDateTime($params[self::DATA], self::DATE_Y_M_D);
        $this->quantidadeOperacoes = (int) $this->setAttribute(self::QUANTIDADE_OPERACOES, $params);
        $this->quantidadeDocumentos = (int) $this->setAttribute(self::QUANTIDADE_DOCUMENTOS, $params);
        $this->saldoBloqueado = (float) $this->setAttribute(self::SALDO_BLOQUEADO, $params);
        $this->saldoDesbloqueado = (float) $this->setAttribute(self::SALDO_DESBLOQUEADO, $params);
        $this->saldoAguardandoDesbloqueio = (float) $this->setAttribute(self::SALDO_AGUARDANDO_DESBLOQUEIO, $params);
    }

    public function getAnoExecucao(): ?int
    {
        return $this->anoExecucao;
    }

    public function getData(): ?Datetime
    {
        return $this->data;
    }

    public function getQuantidadeOperacoes(): ?int
    {
        return $this->quantidadeOperacoes;
    }

    public function getQuantidadeDocumentos(): ?int
    {
        return $this->quantidadeDocumentos;
    }

    public function getSaldoBloqueado(): ?float
    {
        return $this->saldoBloqueado;
    }

    public function getSaldoDesbloqueado(): ?float
    {
        return $this->saldoDesbloqueado;
    }

    public function getSaldoAguardandoDesbloqueio(): ?float
    {
        return $this->saldoAguardandoDesbloqueio;
    }

    public function jsonSerialize(): array
    {
        $serialization = [
            self::ANO_EXECUCAO => $this->getAnoExecucao(),
            self::DATA => $this->dateTimeToString($this->getData()),
            self::QUANTIDADE_OPERACOES => $this->getQuantidadeOperacoes(),
            self::QUANTIDADE_DOCUMENTOS => $this->getQuantidadeDocumentos(),
            self::SALDO_BLOQUEADO => $this->getSaldoBloqueado(),
            self::SALDO_DESBLOQUEADO => $this->getSaldoDesbloqueado(),
            self::SALDO_AGUARDANDO_DESBLOQUEIO => $this->getSaldoAguardandoDesbloqueio(),
        ];

        return $serialization;
    }


}