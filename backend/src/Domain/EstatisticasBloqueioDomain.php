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
    public const QUANTIDADE_OPERACOES_BLOQUEADAS = 'quantidadeOperacoesBloqueadas';
    public const QUANTIDADE_DOCUMENTOS_BLOQUEADOS = 'quantidadeDocumentosBloqueados';
    public const SALDO_BLOQUEADO = 'saldoBloqueado';
    public const QUANTIDADE_OPERACOES_AGUARDANDO_DESBLOQUEIO = 'quantidadeOperacoesAguardandoDesbloqueio';
    public const QUANTIDADE_DOCUMENTOS_AGUARDANDO_DESBLOQUEIO = 'quantidadeDocumentosAguardandoDesbloqueio';
    public const SALDO_AGUARDANDO_DESBLOQUEIO = 'saldoAguardandoDesbloqueio';
    public const QUANTIDADE_OPERACOES_DESBLOQUEADAS = 'quantidadeOperacoesDesbloqueadas';
    public const QUANTIDADE_DOCUMENTOS_DESBLOQUEADOS = 'quantidadeDocumentosDesbloqueados';
    public const SALDO_DESBLOQUEADO = 'saldoDesbloqueado';
    public const TIPO_INFORMACAO_ID = 'tipoInformacaoId';
    public const TIPO_INFORMACAO_DESCRICAO = 'tipoInformacaoDescricao';

    private $anoExecucao;
    private $anoOrcamentario;
    private $data;
    private $gigovId;
    private $gigovNome;
    private $siglaGestor;
    private $nomeGestor;
    private $quantidadeOperacoesBloqueadas;
    private $quantidadeDocumentosBloqueados;
    private $saldoBloqueado;
    private $quantidadeOperacoesAguardandoDesbloqueio;
    private $quantidadeDocumentosAguardandoDesbloqueio;
    private $saldoAguardandoDesbloqueio;
    private $quantidadeOperacoesDesbloqueadas;
    private $quantidadeDocumentosDesbloqueados;
    private $saldoDesbloqueado;
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
        $this->quantidadeOperacoesBloqueadas = (int) $this->setAttribute(
            self::QUANTIDADE_OPERACOES_BLOQUEADAS,
            $params
        );
        $this->quantidadeDocumentosBloqueados = (int) $this->setAttribute(
            self::QUANTIDADE_DOCUMENTOS_BLOQUEADOS,
            $params
        );
        $this->saldoBloqueado = (float) $this->setAttribute(self::SALDO_BLOQUEADO, $params);
        $this->quantidadeOperacoesAguardandoDesbloqueio = (int) $this->setAttribute(
            self::QUANTIDADE_OPERACOES_AGUARDANDO_DESBLOQUEIO,
            $params
        );
        $this->quantidadeDocumentosAguardandoDesbloqueio = (int) $this->setAttribute(
            self::QUANTIDADE_DOCUMENTOS_AGUARDANDO_DESBLOQUEIO,
            $params
        );
        $this->saldoAguardandoDesbloqueio = (float) $this->setAttribute(self::SALDO_AGUARDANDO_DESBLOQUEIO, $params);
        $this->quantidadeOperacoesDesbloqueadas = (int) $this->setAttribute(
            self::QUANTIDADE_OPERACOES_DESBLOQUEADAS,
            $params
        );
        $this->quantidadeDocumentosDesbloqueados = (int) $this->setAttribute(
            self::QUANTIDADE_DOCUMENTOS_DESBLOQUEADOS,
            $params
        );
        $this->saldoDesbloqueado = (float) $this->setAttribute(self::SALDO_DESBLOQUEADO, $params);
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

    public function getQuantidadeOperacoesBloqueadas(): ?int
    {
        return $this->quantidadeOperacoesBloqueadas;
    }

    public function getQuantidadeDocumentosBloqueados(): ?int
    {
        return $this->quantidadeDocumentosBloqueados;
    }

    public function getSaldoBloqueado(): ?float
    {
        return $this->saldoBloqueado;
    }

    public function getQuantidadeOperacoesAguardandoDesbloqueio(): ?int
    {
        return $this->quantidadeOperacoesAguardandoDesbloqueio;
    }

    public function getQuantidadeDocumentosAguardandoDesbloqueio(): ?int
    {
        return $this->quantidadeDocumentosAguardandoDesbloqueio;
    }

    public function getSaldoAguardandoDesbloqueio(): ?float
    {
        return $this->saldoAguardandoDesbloqueio;
    }

    public function getQuantidadeOperacoesDesbloqueadas(): ?int
    {
        return $this->quantidadeOperacoesDesbloqueadas;
    }

    public function getQuantidadeDocumentosDesbloqueados(): ?int
    {
        return $this->quantidadeDocumentosDesbloqueados;
    }

    public function getSaldoDesbloqueado(): ?float
    {
        return $this->saldoDesbloqueado;
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
            self::QUANTIDADE_OPERACOES_BLOQUEADAS => $this->getQuantidadeOperacoesBloqueadas(),
            self::QUANTIDADE_DOCUMENTOS_BLOQUEADOS => $this->getQuantidadeDocumentosBloqueados(),
            self::SALDO_BLOQUEADO => $this->getSaldoBloqueado(),
            self::QUANTIDADE_OPERACOES_AGUARDANDO_DESBLOQUEIO => $this->getQuantidadeOperacoesAguardandoDesbloqueio(),
            self::QUANTIDADE_DOCUMENTOS_AGUARDANDO_DESBLOQUEIO => $this->getQuantidadeDocumentosAguardandoDesbloqueio(),
            self::SALDO_AGUARDANDO_DESBLOQUEIO => $this->getSaldoAguardandoDesbloqueio(),
            self::QUANTIDADE_OPERACOES_DESBLOQUEADAS => $this->getQuantidadeOperacoesDesbloqueadas(),
            self::QUANTIDADE_DOCUMENTOS_DESBLOQUEADOS => $this->getQuantidadeDocumentosDesbloqueados(),
            self::SALDO_DESBLOQUEADO => $this->getSaldoDesbloqueado(),
            self::TIPO_INFORMACAO_ID => $this->getTipoInformacaoId(),
            self::TIPO_INFORMACAO_DESCRICAO => $this->getTipoInformacaoDescricao(),
        ];

        return $serialization;
    }
}
