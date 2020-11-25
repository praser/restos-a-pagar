<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class LiminarDomain extends DomainBase
{
    private const NUMERO_PROCESSO = 'numeroProcesso';
    private const REQUERENTE = 'requerente';
    private const DATA_DECISAO = 'dataDecisao';
    private const SIARG = 'siarg';
    private const OBSERVACOES = 'observacoes';
    private const RESPONSAVEL_CADASTRAMENTO_ID = 'responsavelCadastramentoId';
    private const RESPONSAVEL_CADASTRAMENTO_NOME = 'responsavelCadastramentoNome';
    private const RESPONSAVEL_CADASTRAMENTO_UNIDADEI_D = 'responsavelCadastramentoUnidadeId';
    private const RESPONSAVEL_CADASTRAMENTO_UNIDADE_SIGLA = 'responsavelCadastramentoUnidadeSigla';
    private const RESPONSAVEL_ATESTE_ID = 'responsavelAtesteId';
    private const RESPONSAVEL_ATESTE_NOME = 'responsavelAtesteNome';
    private const RESPONSAVEL_ATESTEUNIDADE_ID = 'responsavelAtesteUnidadeId';
    private const RESPONSAVEL_ATESTEUNIDADE_SIGLA = 'responsavelAtesteUnidadeSigla';
    private const FIM_VIGENCIA = 'fimVigencia';

    private $numeroProcesso;
    private $requerente;
    private $dataDecisao;
    private $siarg;
    private $observacoes;
    private $responsavelCadastramentoId;
    private $responsavelCadastramentoNome;
    private $responsavelCadastramentoUnidadeId;
    private $responsavelCadastramentoUnidadeSigla;
    private $responsavelAtesteId;
    private $responsavelAtesteNome;
    private $responsavelAtesteUnidadeId;
    private $responsavelAtesteUnidadeSigla;
    private $fimVigencia;
  
    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->numeroProcesso = $this->setAttribute(self::NUMERO_PROCESSO, $params);
        $this->requerente = $this->setAttribute(self::REQUERENTE, $params);
        $this->dataDecisao = $this->parseDateTime($params[self::DATA_DECISAO], self::DATE_Y_M_D);
        $this->siarg = $this->setAttribute(self::SIARG, $params);
        $this->observacoes = $this->setAttribute(self::OBSERVACOES, $params);
        $this->responsavelCadastramentoId = $this->setAttribute(self::RESPONSAVEL_CADASTRAMENTO_ID, $params);
        $this->responsavelCadastramentoNome = $this->setAttribute(self::RESPONSAVEL_CADASTRAMENTO_NOME, $params);
        $this->responsavelCadastramentoUnidadeId = $this->setAttribute(
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADEI_D,
            $params
        );
        $this->responsavelCadastramentoUnidadeSigla = $this->setAttribute(
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_SIGLA,
            $params
        );
        $this->responsavelAtesteId = $this->setAttribute(self::RESPONSAVEL_ATESTE_ID, $params);
        $this->responsavelAtesteNome = $this->setAttribute(self::RESPONSAVEL_ATESTE_NOME, $params);
        $this->responsavelAtesteUnidadeId = $this->setAttribute(self::RESPONSAVEL_ATESTEUNIDADE_ID, $params);
        $this->responsavelAtesteUnidadeSigla = $this->setAttribute(self::RESPONSAVEL_ATESTEUNIDADE_SIGLA, $params);
        $this->fimVigencia = $this->parseDateTime($params[self::FIM_VIGENCIA], self::DATE_Y_M_D);
    }
  
    public function getNumeroProcesso(): ?string
    {
        return $this->numeroProcesso;
    }
  
    public function getRequerente(): ?string
    {
        return $this->requerente;
    }
    
    public function getDataDecisao(): ?DateTime
    {
        return $this->dataDecisao;
    }
    
    public function getSiarg(): ?int
    {
        return $this->siarg;
    }
    
    public function getObservacoes(): ?string
    {
        return $this->observacoes;
    }
    
    public function getResponsavelCadastramentoId(): ?string
    {
        return $this->responsavelCadastramentoId;
    }
    
    public function getResponsavelCadastramentoNome(): ?string
    {
        return $this->responsavelCadastramentoNome;
    }
    
    public function getResponsavelCadastramentoUnidadeId(): ?int
    {
        return $this->responsavelCadastramentoUnidadeId;
    }
    
    public function getResponsavelCadastramentoUnidadeSigla(): ?string
    {
        return $this->responsavelCadastramentoUnidadeSigla;
    }
    
    public function getResponsavelAtesteId(): ?string
    {
        return $this->responsavelAtesteId;
    }
    
    public function getResponsavelAtesteNome(): ?string
    {
        return $this->responsavelAtesteNome;
    }
    
    public function getResponsavelAtesteUnidadeId(): ?int
    {
        return $this->responsavelAtesteUnidadeId;
    }
    
    public function getResponsavelAtesteUnidadeSigla(): ?string
    {
        return $this->responsavelAtesteUnidadeSigla;
    }

    public function getFimVigencia(): ?DateTime
    {
        return $this->fimVigencia;
    }

    public function setResponsavelCadastramento(UserDomain $user): void
    {
        $this->responsavelCadastramentoId = $user->getRegistration();
        $this->responsavelCadastramentoNome = $user->getName();
        $this->responsavelCadastramentoUnidadeId = $user->getPhysicalLotationId();
        $this->responsavelCadastramentoUnidadeSigla = $user->getPhysicalLotationAbbreviation();
    }

    public function isValid(): bool
    {
        $v = $this->validator;
        $v->setName(self::NUMERO_PROCESSO)->setValue($this->getNumeroProcesso())->required();
        $v->setName(self::REQUERENTE)->setValue($this->getRequerente())->required();
        $v->setName(self::DATA_DECISAO)->setValue($this->getDataDecisao())->required();
        $v->setName(self::DATA_DECISAO)->isInstanceOf($this->getDataDecisao(), DateTime::class);
        $v->setName(self::SIARG)->setValue($this->getSiarg())->required();
        $v->setName(self::SIARG)->isInt($this->getSiarg());

        $v->setName(self::RESPONSAVEL_CADASTRAMENTO_ID)->setValue($this->getResponsavelCadastramentoId())->required();
        $v->setName(self::RESPONSAVEL_CADASTRAMENTO_NOME)
            ->setValue($this->getResponsavelCadastramentoNome())
            ->required();
        $v->setName(self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_ID)
            ->setValue($this->getResponsavelCadastramentoUnidadeId())
            ->required();
        $v->setName(self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_ID)->isInt($this->getResponsavelCadastramentoUnidadeId());
        $v->setName(self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_SIGLA)
            ->setValue($this->getResponsavelCadastramentoUnidadeSigla())
            ->required();
        $v->setName(self::RESPONSAVEL_ATESTEUNIDADE_ID)->setValue($this->getResponsavelUnidadeId())->required();
        $v->setName(self::RESPONSAVEL_ATESTEUNIDADE_ID)->isInt($this->getResponsavelUnidadeId());
        $v->setName(self::FIM_VIGENCIA)->isInstanceOf($this->getFimVigencia(), DateTime::class);
        
        return $v->isSuccess();
    }

    public function jsonSerialize(): array
    {
        $serialization = [

            self::NUMERO_PROCESSO => $this->getNumeroProcesso(),
            self::REQUERENTE => $this->getRequerente(),
            self::DATA_DECISAO => $this->dateTimeToString($this->getDataDecisao()),
            self::SIARG => $this->getSiarg(),
            self::OBSERVACOES => $this->getObservacoes(),
            self::RESPONSAVEL_CADASTRAMENTO_ID => $this->getResponsavelCadastramentoId(),
            self::RESPONSAVEL_CADASTRAMENTO_NOME => $this->getResponsavelCadastramentoNome(),
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADEI_D => $this->getResponsavelCadastramentoUnidadeId(),
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_SIGLA => $this->getResponsavelCadastramentoUnidadeSigla(),
            self::RESPONSAVEL_ATESTE_ID => $this->getResponsavelAtesteId(),
            self::RESPONSAVEL_ATESTE_NOME => $this->getResponsavelAtesteNome(),
            self::RESPONSAVEL_ATESTEUNIDADE_ID => $this->getResponsavelAtesteUnidadeId(),
            self::RESPONSAVEL_ATESTEUNIDADE_SIGLA => $this->getResponsavelAtesteUnidadeSigla(),
            self::FIM_VIGENCIA => $this->dateTimeToString($this->getFimVigencia()),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
