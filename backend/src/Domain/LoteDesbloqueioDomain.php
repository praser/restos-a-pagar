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
    private const LIMINAR_ID = 'liminarId';
    private const FILE_PATH = 'filePath';
    private const CHECKSUM = 'checksum';

    private $sequencial;
    private $ano;
    private $ce;
    private $responsavelId;
    private $responsavelNome;
    private $responsavelUnidadeId;
    private $responsavelUnidadeSigla;
    private $situacao;
    private $liminarId;
    private $filePath;
    private $checksum;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->sequencial = $this->setAttribute(self::SEQUENCIAL, $params);
        $this->ano = $this->setAttribute(self::ANO, $params);
        $this->ce = $this->setAttribute(self::CE, $params);
        $this->responsavelId = $this->setAttribute(self::RESPONSAVEL_ID, $params);
        $this->responsavelNome = $this->setAttribute(self::RESPONSAVEL_NOME, $params);
        $this->responsavelUnidadeId = $this->setAttribute(self::RESPONSAVEL_UNIDADE_ID, $params);
        $this->responsavelUnidadeSigla = $this->setAttribute(self::RESPONSAVEL_UNIDADE_SIGLA, $params);
        $this->situacao = $this->setAttribute(self::SITUACAO, $params);
        $this->liminarId = $this->setAttribute(self::LIMINAR_ID, $params);
        $this->filePath = $this->setAttribute(self::FILE_PATH, $params);
        $this->checksum = $this->setAttribute(self::CHECKSUM, $params);
    }

    public function getSequencial(): ?int
    {
        return $this->sequencial;
    }

    public function setSequencial(int $sequencial): LoteDesbloqueioDomain
    {
        $this->sequencial = $sequencial;
        return $this;
    }

    public function getAno(): ?int
    {
        return $this->ano;
    }

    public function setAno(int $ano): LoteDesbloqueioDomain
    {
        $this->ano = $ano;
        return $this;
    }

    public function getCe(): ?string
    {
        return $this->ce;
    }

    public function setCe(string $ce): LoteDesbloqueioDomain
    {
        $this->ce = $ce;
        return $this;
    }

    public function getResponsavelId(): ?string
    {
        return $this->responsavelId;
    }

    public function setResponsavelId(string $responsavelId): LoteDesbloqueioDomain
    {
        $this->responsavelId = $responsavelId;
        return $this;
    }

    public function getResponsavelNome(): ?string
    {
        return $this->responsavelNome;
    }

    public function setResponsavelNome(string $responsavelNome): LoteDesbloqueioDomain
    {
        $this->responsavelNome = $responsavelNome;
        return $this;
    }

    public function getResponsavelUnidadeId(): ?int
    {
        return $this->responsavelUnidadeId;
    }

    public function setResponsavelUnidadeId(int $responsavelUnidadeId): LoteDesbloqueioDomain
    {
        $this->responsavelUnidadeId = $responsavelUnidadeId;
        return $this;
    }

    public function getResponsavelUnidadeSigla(): ?string
    {
        return $this->responsavelUnidadeSigla;
    }

    public function setResponsavelUnidadeSigla(string $responsavelUnidadeSigla): LoteDesbloqueioDomain
    {
        $this->responsavelUnidadeSigla = $responsavelUnidadeSigla;
        return $this;
    }

    public function getSituacao(): ?string
    {
        return $this->situacao;
    }

    public function setSituacao(string $situacao): LoteDesbloqueioDomain
    {
        $this->situacao = $situacao;
        return $this;
    }

    public function getLiminarId(): ?int
    {
        return $this->liminarId;
    }

    public function setLiminarId(int $liminarId): LoteDesbloqueioDomain
    {
        $this->liminarId = $liminarId;
        return $this;
    }

    public function getFilePath()
    {
        return $this->filePath;
    }

    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;
        return $this;
    }

    public function getChecksum()
    {
        return $this->checksum;
    }

    public function setChecksum($checksum)
    {
        $this->checksum = $checksum;
        return $this;
    }

    public function numero(): string
    {
        return substr("000{$this->getSequencial()}/{$this->getAno()}", -8);
    }

    public function isValid(): bool
    {
        $v = $this->validator;
        $v->setName(self::SEQUENCIAL)->isInt($this->getSequencial());
        $v->setName(self::ANO)->isInt($this->getAno());
        $v->setName(self::CE)->setValue($this->getCe())->required();
        $v->setName(self::RESPONSAVEL_ID)->setValue($this->getResponsavelId())->required();
        $v->setName(self::RESPONSAVEL_NOME)->setValue($this->getResponsavelNome())->required();
        $v->setName(self::RESPONSAVEL_UNIDADE_ID)->setValue($this->getResponsavelUnidadeId())->required();
        $v->setName(self::RESPONSAVEL_UNIDADE_ID)->isInt($this->getResponsavelUnidadeId());
        $v->setName(self::RESPONSAVEL_UNIDADE_SIGLA)->setValue($this->getResponsavelUnidadeSigla())->required();
        $v->setName(self::LIMINAR_ID)->isInt($this->getLiminarId());
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
            self::LIMINAR_ID => $this->getLiminarId(),
            self::FILE_PATH => $this->getFilePath(),
            self::CHECKSUM => $this->getChecksum(),
        ];
    
        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
