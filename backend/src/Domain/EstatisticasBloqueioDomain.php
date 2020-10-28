<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class EstatisticasBloqueioDomain extends DomainBase
{
    public const ANO_EXECUCAO = 'anoExecucao';
    public const ANO_ORCAMENTARIO = 'anoOrcamentario';
    public const DATA = 'data';
    public const GIGOV_ID = 'gigovId';
    public const GIGOV_NOME = 'gigovNome';
    public const SIGLA_GESTOR = 'siglaGestor';
    public const NOME_GESTOR = 'nomeGestor';
    public const QUANTIDADE_OPERACOES = 'quantidadeOperacoes';
    public const QUANTIDADE_DOCUMENTOS = 'quantidadeDocumentos';
    public const SALDO_BLOQUEADO = 'saldoBloqueado';
    public const SALDO_DESBLOQUEADO = 'saldoDesbloqueado';
    public const SALDO_AGUARDANDO_DESBLOQUEIO = 'saldoAguardandoDesbloqueio';
    public const TIPO_INFORMACAO_ID = 'tipoInformacaoId';
    public const TIPO_INFORMACAO_DESCRICAO = 'tipoInformacaoDescricao';

    private $anoExecucao;
    private $anoOrcamentario;
    private $data;
    private $gigovId;
    private $gigovNome;
    private $siglaGestor;
    private $nomeGestor;
    private $quantidadeOperacoes;
    private $quantidadeDocumentos;
    private $saldoBloqueado;
    private $saldoDesbloqueado;
    private $saldoAguardandoDesbloqueio;
    private $tipoInformacaoId;
    private $tipoInformacaoDescricao;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->anoExecucao = (int) $this->setAttribute(self::ANO_EXECUCAO, $params);
        $this->anoOrcamentario = (int) $this->setAttribute(self::ANO_ORCAMENTARIO, $params);
        $this->data = $this->parseDateTime($params[self::DATA], self::DATE_Y_M_D);
        $this->gigovId = (int) $this->setAttribute(self::GIGOV_ID, $params);
        $this->gigovNome = (string) $this->setAttribute(self::GIGOV_NOME, $params);
        $this->siglaGestor = (string) $this->setAttribute(self::SIGLA_GESTOR, $params);
        $this->nomeGestor = (string) $this->setAttribute(self::NOME_GESTOR, $params);
        $this->quantidadeOperacoes = (int) $this->setAttribute(self::QUANTIDADE_OPERACOES, $params);
        $this->quantidadeDocumentos = (int) $this->setAttribute(self::QUANTIDADE_DOCUMENTOS, $params);
        $this->saldoBloqueado = (float) $this->setAttribute(self::SALDO_BLOQUEADO, $params);
        $this->saldoDesbloqueado = (float) $this->setAttribute(self::SALDO_DESBLOQUEADO, $params);
        $this->saldoAguardandoDesbloqueio = (float) $this->setAttribute(self::SALDO_AGUARDANDO_DESBLOQUEIO, $params);
        $this->tipoInformacaoId = (int) $this->setAttribute(self::TIPO_INFORMACAO_ID, $params);
        $this->tipoInformacaoDescricao = (string) $this->setAttribute(self::TIPO_INFORMACAO_DESCRICAO, $params);
    }

    public function getAnoExecucao(): ?int
    {
        return $this->anoExecucao;
    }

    public function getAnoOrcamentario(): ?int
    {
        return $this->anoOrcamentario;
    }

    public function getData(): ?Datetime
    {
        return $this->data;
    }

    public function getGigovId(): ?int
    {
        return $this->gigovId;
    }

    public function getGigovNome(): ?string
    {
        return $this->gigovNome;
    }

    public function getSiglaGestor(): ?string
    {
        return $this->siglaGestor;
    }

    public function getNomeGestor(): ?string
    {
        return $this->nomeGestor;
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

    public function getTipoInformacaoId(): ?int
    {
        return $this->tipoInformacaoId;
    }

    public function getTipoInformacaoDescricao(): ?string
    {
        return $this->tipoInformacaoDescricao;
    }

    public function jsonSerialize(): array
    {
        $serialization = [
            self::ANO_EXECUCAO => $this->getAnoExecucao(),
            self::ANO_ORCAMENTARIO => $this->getAnoOrcamentario(),
            self::DATA => $this->dateTimeToString($this->getData()),
            self::GIGOV_ID => $this->getGigovId(),
            self::GIGOV_NOME => $this->getGigovNome(),
            self::SIGLA_GESTOR => $this->getSiglaGestor(),
            self::NOME_GESTOR => $this->getNomeGestor(),
            self::QUANTIDADE_OPERACOES => $this->getQuantidadeOperacoes(),
            self::QUANTIDADE_DOCUMENTOS => $this->getQuantidadeDocumentos(),
            self::SALDO_BLOQUEADO => $this->getSaldoBloqueado(),
            self::SALDO_DESBLOQUEADO => $this->getSaldoDesbloqueado(),
            self::SALDO_AGUARDANDO_DESBLOQUEIO => $this->getSaldoAguardandoDesbloqueio(),
            self::TIPO_INFORMACAO_ID => $this->getTipoInformacaoId(),
            self::TIPO_INFORMACAO_DESCRICAO => $this->getTipoInformacaoDescricao(),
        ];

        return $serialization;
    }


}