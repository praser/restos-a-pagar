<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class EstatisticasPreBloqueioDomain extends DomainBase
{
    public const ANO_EXECUCAO = 'anoExecucao';
    public const ANO_ORCAMENTARIO = 'anoOrcamentario';
    public const DATA = 'data';
    public const GIGOV_ID = 'gigovId';
    public const GIGOV_NOME = 'gigovNome';
    public const SIGLA_GESTOR = 'siglaGestor';
    public const NOME_GESTOR = 'nomeGestor';
    public const QUANTIDADE_OPERACOES = 'quantidade_operacoes';
    public const QUANTIDADE_NOTAS_EMPENHO = 'quantidade_notas_empenho';
    public const SALDO_NOTAS_EMPENHO = 'saldo_notas_empenho';
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
    private $quantidadeNotasEmpenho;
    private $saldoNotasEmpenho;
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
        $this->quantidadeNotasEmpenho = (int) $this->setAttribute(self::QUANTIDADE_NOTAS_EMPENHO, $params);
        $this->saldoNotasEmpenho = (float) $this->setAttribute(self::SALDO_NOTAS_EMPENHO, $params);
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

    public function getQuantidadeNotasEmpenho(): ?int
    {
        return $this->quantidadeNotasEmpenho;
    }

    public function getSaldoNotasEmpenho(): ?float
    {
        return $this->saldoNotasEmpenho;
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
            self::QUANTIDADE_NOTAS_EMPENHO => $this->getQuantidadeNotasEmpenho(),
            self::SALDO_NOTAS_EMPENHO => $this->getSaldoNotasEmpenho(),
            self::TIPO_INFORMACAO_ID => $this->getTipoInformacaoId(),
            self::TIPO_INFORMACAO_DESCRICAO => $this->getTipoInformacaoDescricao(),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }


}