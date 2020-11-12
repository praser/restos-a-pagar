<?php

namespace App\Domain;

use DateTime;

class LoteDesbloqueioDomain extends DomainBase
{
  private const SEQUENCIAL = 'sequencial';
  private const ANO = 'ano';
  private const CE = 'ce';
  private const RESPONSAVEL_ID = 'responsavelId';
  private const RESPONSAVEL_NOME = 'responsavelNome';
  private const RESPONSAVEL_UNIDADE_ID = 'responsavelUnidadeId';
  private const RESPONSAVEL_UNIDADE_SIGLA = 'responsavelUnidadeSigla';
  private const SITUACAO = 'situacao';

  private $sequencial;
  private $ano;
  private $ce;
  private $responsavelId;
  private $responsavelNome;
  private $responsavelUnidadeId;
  private $responsavelUnidadeSigla;
  private $situacao;

  public function __construct(array $params = [])
  {
    parent::__construct($params);
    $this->sequencial = (int) $this->setAttribute(self::SEQUENCIAL, $params);
    $this->ano = (int) $this->setAttribute(self::ANO, $params);
    $this->ce = (string) $this->setAttribute(self::CE, $params);
    $this->responsavelId = (string) $this->setAttribute(self::RESPONSAVEL_ID, $params);
    $this->responsavelNome = (string) $this->setAttribute(self::RESPONSAVEL_NOME, $params);
    $this->responsavelUnidadeId = (int) $this->setAttribute(self::RESPONSAVEL_UNIDADE_ID, $params);
    $this->responsavelUnidadeSigla = (string) $this->setAttribute(self::RESPONSAVEL_UNIDADE_SIGLA, $params);
    $this->situacao = (string) $this->setAttribute(self::SITUACAO, $params);
  }

  public function getSequencial() : ?int
  {
    return $this->sequencial;
  }

  public function setSequencial(int $sequencial) : LoteDesbloqueioDomain
  {
    $this->sequencial = $sequencial;
    return $this;
  }

  public function getAno() : ?int
  {
    return $this->ano;
  }

  public function setAno(int $ano) : LoteDesbloqueioDomain
  {
    $this->ano = $ano;
    return $this;
  }

  public function getCe() : ?string
  {
    return $this->ce;
  }
  
  public function setCe(string $ce) : LoteDesbloqueioDomain
  {
    $this->ce = $ce;
    return $this;
  }

  public function getResponsavelId() : ?string
  {
    return $this->responsavelId;
  }

  public function setResponsavelId(string $responsavelId) : LoteDesbloqueioDomain
  {
    $this->responsavelId = $responsavelId;
    return $this;
  }

  public function getResponsavelNome() : ?string
  {
    return $this->responsavelNome;
  }

  public function setResponsavelNome(string $responsavelNome) : LoteDesbloqueioDomain
  {
    $this->responsavelNome = $responsavelNome;
    return $this;
  }

  public function getResponsavelUnidadeId() : ?int
  {
    return $this->responsavelUnidadeId;
  }

  public function setResponsavelUnidadeId(int $responsavelUnidadeId) : LoteDesbloqueioDomain
  {
    $this->responsavelUnidadeId = $responsavelUnidadeId;
    return $this;
  }

  public function getResponsavelUnidadeSigla() : ?string
  {
    return $this->responsavelUnidadeSigla;
  }

  public function setResponsavelUnidadeSigla(string $responsavelUnidadeSigla) : LoteDesbloqueioDomain
  {
    $this->responsavelUnidadeSigla = $responsavelUnidadeSigla;
    return $this;
  }

  public function getSituacao() : ?string
  {
    return $this->situacao;
  }

  public function setSituacao(string $situacao) : LoteDesbloqueioDomain
  {
    $this->situacao = $situacao;
    return $this;
  }

  public function isValid(): bool
  {
      $v = $this->validator;
      $v->setName(self::SEQUENCIAL)->setValue($this->getSequencial())->required();
      $v->setName(self::SEQUENCIAL)->isInt($this->getSequencial());
      $v->setName(self::ANO)->setValue($this->getAno())->required();
      $v->setName(self::CE)->setValue($this->getCe())->required();
      $v->setName(self::CE)->isInstanceOf($this->getCe(), DateTime::class);
      $v->setName(self::RESPONSAVEL_ID)->setValue($this->getResponsavelId())->required();
      $v->setName(self::RESPONSAVEL_NOME)->setValue($this->getResponsavelNome())->required();
      $v->setName(self::RESPONSAVEL_UNIDADE_ID)->setValue($this->getResponsavelUnidadeId())->required();
      $v->setName(self::RESPONSAVEL_UNIDADE_ID)->isInt($this->getResponsavelUnidadeId());
      $v->setName(self::RESPONSAVEL_UNIDADE_SIGLA)->setValue($this->getResponsavelUnidadeSigla())->required();
      $v->setName(self::SITUACAO)->setValue($this->getSituacao())->required();
      return $v->isSuccess();
  }

  public function jsonSerialize(): array
  {
    $serialization = [
      self::SEQUENCIAL => $this->getSequencial(),
      self::ANO => $this->getAno(),
      self::CE => $this->getCe(),
      self::RESPONSAVEL_ID => $this->getResponsavelId(),
      self::RESPONSAVEL_NOME => $this->getResponsavelNome(),
      self::RESPONSAVEL_UNIDADE_ID => $this->getResponsavelUnidadeId(),
      self::RESPONSAVEL_UNIDADE_SIGLA => $this->getResponsavelUnidadeSigla(),
      self::SITUACAO => $this->getSituacao(),
    ];

    return array_merge(parent::jsonSerialize(), $serialization);
  }
}