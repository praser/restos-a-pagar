<?php

namespace App\Domain;

use DateTime;

class LoteDesbloqueioOperacaoDomain extends DomainBase
{
  private const LOTE_DESBLOQUEIO_ID = 'loteDesbloqueioId';
  public const OPERACAO_ID = 'operacaoId';
  public const DOCUMENTO = 'documento';
  public const SALDO = 'saldo';
  private const DESBLOQUEADO = 'desbloqueado';
  private const RESPONSAVEL_RETORNO_ID = 'responsavelRetornoId';
  private const RESPONSAVEL_RETORNO_NOME = 'responsavelRetornoNome';
  private const RESPONSAVEL_RETORNO_UNIDADE_ID = 'responsavelRetornoUnidadeId';
  private const RESPONSAVEL_RETORNO_UNIDADE_SIGLA = 'responsavelRetornoUnidadeSigla';

  private $loteDesbloqueioId;
  private $operacaoId;
  private $documento;
  private $saldo;
  private $debloqueado;
  private $responsavelRetornoId;
  private $responsavelRetornoNome;
  private $responsavelRetornoUnidadeId;
  private $responsavelRetornoUnidadeSigla;

  public function __construct(array $params = [])
  {
    parent::__construct($params);
    $this->loteDesbloqueioId = (int) $this->setAttribute(self::LOTE_DESBLOQUEIO_ID, $params);
    $this->operacaoId = (int) $this->setAttribute(self::OPERACAO_ID, $params);
    $this->documento = (string) $this->setAttribute(self::DOCUMENTO, $params);
    $this->saldo = (float) $this->setAttribute(self::SALDO, $params);
    $this->desbloqueado = (bool) $this->setAttribute(self::DESBLOQUEADO, $params);
    $this->responsavelRetornoId = (string) $this->setAttribute(self::RESPONSAVEL_RETORNO_ID, $params);
    $this->responsavelRetornoNome = (string) $this->setAttribute(self::RESPONSAVEL_RETORNO_NOME, $params);
    $this->responsavelRetornoUnidadeId = (int) $this->setAttribute(self::RESPONSAVEL_RETORNO_UNIDADE_ID, $params);
    $this->responsavelRetornoUnidadeSigla = (string) $this->setAttribute(self::RESPONSAVEL_RETORNO_UNIDADE_SIGLA, $params);
  }

  public function getLoteDesbloqueioId() : ?int
  {
    return $this->loteDesbloqueioId;
  }

  public function setLoteDesbloqueioId(int $loteDesbloqueioId) : LoteDesbloqueioOperacaoDomain
  {
    $this->loteDesbloqueioId = $loteDesbloqueioId;
    return $this;
  }

  public function getOperacaoId() : ?int
  {
    return $this->operacaoId;
  }

  public function setOperacaoId(int $operacaoId) : LoteDesbloqueioOperacaoDomain
  {
    $this->operacaoId = $operacaoId;
    return $this;
  }

  public function getDocumento() : ?string
  {
    return $this->documento;
  }
  
  public function setDocumento(string $documento) : LoteDesbloqueioOperacaoDomain
  {
    $this->documento = $documento;
    return $this;
  }

  public function getSaldo() : ?float
  {
    return $this->saldo;
  }

  public function setSaldo(float $saldo) : LoteDesbloqueioOperacaoDomain
  {
    $this->saldo = $saldo;
    return $this;
  }

  public function isDesbloqueado(): bool
  {
    return (bool) $this->desbloqueado;
  }

  function setDesbloqueado(bool $desbloqueado): LoteDesbloqueioOperacaoDomain
  {
    $this->desbloqueado = $desbloqueado;
    return $this;
  }

  public function getResponsavelRetornoId() : ?string
  {
    return $this->responsavelRetornoId;
  }

  public function setResponsavelRetornoId(string $responsavelRetornoId) : LoteDesbloqueioOperacaoDomain
  {
    $this->responsavelRetornoId = $responsavelRetornoId;
    return $this;
  }

  public function getResponsavelRetornoNome() : ?string
  {
    return $this->responsavelRetornoNome;
  }

  public function setResponsavelRetornoNome(string $responsavelRetornoNome) : LoteDesbloqueioOperacaoDomain
  {
    $this->responsavelRetornoNome = $responsavelRetornoNome;
    return $this;
  }

  public function getResponsavelRetornoUnidadeId() : ?int
  {
    return $this->responsavelRetornoUnidadeId;
  }

  public function setResponsavelRetornoUnidadeId(int $responsavelRetornoUnidadeId) : LoteDesbloqueioOperacaoDomain
  {
    $this->responsavelRetornoUnidadeId = $responsavelRetornoUnidadeId;
    return $this;
  }

  public function getResponsavelUnidadeSigla() : ?string
  {
    return $this->responsavelRetornoUnidadeSigla;
  }

  public function setResponsavelUnidadeSigla(string $responsavelRetornoUnidadeSigla) : LoteDesbloqueioOperacaoDomain
  {
    $this->responsavelRetornoUnidadeSigla = $responsavelRetornoUnidadeSigla;
    return $this;
  }

  public function isValid(): bool
  {
      $v = $this->validator;
      $v->setName(self::LOTE_DESBLOQUEIO_ID)->setValue($this->getLoteDesbloqueioId())->required();
      $v->setName(self::LOTE_DESBLOQUEIO_ID)->isInt($this->getLoteDesbloqueioId());
      $v->setName(self::OPERACAO_ID)->setValue($this->getOperacaoId())->required();
      $v->setName(self::OPERACAO_ID)->isInt($this->getOperacaoId());
      $v->setName(self::DOCUMENTO)->setValue($this->getDocumento())->customPattern('\d{4}NE\d{6}')->required();
      $v->setName(self::SALDO)->setValue($this->getSaldo())->required();
      $v->setName(self::SALDO)->isFloat($this->getSaldo());
      $v->setName(self::DESBLOQUEADO)->isBool($thus->isDesbloqueado());
      $v->setName(self::RESPONSAVEL_RETORNO_UNIDADE_ID)->isInt($this->getResponsavelRetornoUnidadeId());
      return $v->isSuccess();
  }

  public function jsonSerialize(): array
  {
    $serialization = [
      self::LOTE_DESBLOQUEIO_ID => $this->getLoteDesbloqueioId(),
      self::OPERACAO_ID => $this->getOperacaoId(),
      self::DOCUMENTO => $this->getDocumento(),
      self::SALDO => $this->getSaldo(),
      self::DESBLOQUEADO => $this->isDesbloqueado(),
      self::RESPONSAVEL_RETORNO_ID => $this->getResponsavelRetornoId(),
      self::RESPONSAVEL_RETORNO_NOME => $this->getResponsavelRetornoNome(),
      self::RESPONSAVEL_RETORNO_UNIDADE_ID => $this->getResponsavelRetornoUnidadeId(),
      self::RESPONSAVEL_RETORNO_UNIDADE_SIGLA => $this->getResponsavelUnidadeSigla(),
    ];

    return array_merge(parent::jsonSerialize(), $serialization);
  }
}