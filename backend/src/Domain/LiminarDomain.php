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
    private const DATA_ATESTE = 'dataAteste';
    private const RESPONSAVEL_ATESTE_ID = 'responsavelAtesteId';
    private const RESPONSAVEL_ATESTE_NOME = 'responsavelAtesteNome';
    private const RESPONSAVEL_ATESTE_UNIDADE_ID = 'responsavelAtesteUnidadeId';
    private const RESPONSAVEL_ATESTE_UNIDADE_SIGLA = 'responsavelAtesteUnidadeSigla';
    private const RESPONSAVEL_FIM_VIGENCIA_ID = 'responsavelFimVigenciaId';
    private const RESPONSAVEL_FIM_VIGENCIA_NOME = 'responsavelFimVigenciaNome';
    private const RESPONSAVEL_FIM_VIGENCIA_UNIDADE_ID = 'responsavelFimVigenciaUnidadeId';
    private const RESPONSAVEL_FIM_VIGENCIA_UNIDADE_SIGLA = 'responsavelFimVigenciaUnidadeSigla';
    private const FIM_VIGENCIA = 'fimVigencia';
    private const EMPENHOS_BLOQUEADOS = 'empenhosBloqueados';

    private $numeroProcesso;
    private $requerente;
    private $dataDecisao;
    private $siarg;
    private $observacoes;
    private $responsavelCadastramentoId;
    private $responsavelCadastramentoNome;
    private $responsavelCadastramentoUnidadeId;
    private $responsavelCadastramentoUnidadeSigla;
    private $dataAteste;
    private $responsavelAtesteId;
    private $responsavelAtesteNome;
    private $responsavelAtesteUnidadeId;
    private $responsavelAtesteUnidadeSigla;
    private $fimVigencia;
    private $responsavelFimVigenciaId;
    private $responsavelFimVigenciaNome;
    private $responsavelFimVigenciaUnidadeId;
    private $responsavelFimVigenciaUnidadeSigla;
    private $empenhosBloqueados;
  
    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->numeroProcesso = $this->setAttribute(self::NUMERO_PROCESSO, $params);
        $this->requerente = $this->setAttribute(self::REQUERENTE, $params);
        $this->dataDecisao = $this->parseDateTime($params[self::DATA_DECISAO], self::DATE_Y_M_D);
        $this->siarg = (int) $this->setAttribute(self::SIARG, $params);
        $this->observacoes = $this->setAttribute(self::OBSERVACOES, $params);
        $this->responsavelCadastramentoId = $this->setAttribute(self::RESPONSAVEL_CADASTRAMENTO_ID, $params);
        $this->responsavelCadastramentoNome = $this->setAttribute(self::RESPONSAVEL_CADASTRAMENTO_NOME, $params);
        $this->responsavelCadastramentoUnidadeId = (int) $this->setAttribute(
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADEI_D,
            $params
        );
        $this->responsavelCadastramentoUnidadeSigla = $this->setAttribute(
            self::RESPONSAVEL_CADASTRAMENTO_UNIDADE_SIGLA,
            $params
        );
        $this->dataAteste = $this->parseDateTime($params[self::DATA_ATESTE], self::DATE_Y_M_D_H_I_S);
        $this->responsavelAtesteId = $this->setAttribute(self::RESPONSAVEL_ATESTE_ID, $params);
        $this->responsavelAtesteNome = $this->setAttribute(self::RESPONSAVEL_ATESTE_NOME, $params);
        $this->responsavelAtesteUnidadeId = (int) $this->setAttribute(self::RESPONSAVEL_ATESTE_UNIDADE_ID, $params);
        $this->responsavelAtesteUnidadeSigla = $this->setAttribute(self::RESPONSAVEL_ATESTE_UNIDADE_SIGLA, $params);
        $this->fimVigencia = $this->parseDateTime($params[self::FIM_VIGENCIA], self::DATE_Y_M_D);
        $this->responsavelFimVigenciaId = $this->setAttribute(self::RESPONSAVEL_FIM_VIGENCIA_ID, $params);
        $this->responsavelFimVigenciaNome = $this->setAttribute(self::RESPONSAVEL_FIM_VIGENCIA_NOME, $params);
        $this->responsavelFimVigenciaUnidadeId = (int) $this->setAttribute(
            self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_ID,
            $params
        );
        $this->responsavelFimVigenciaUnidadeSigla = $this->setAttribute(
            self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_SIGLA,
            $params
        );
        $this->empenhosBloqueados = (int) $this->setAttribute(self::EMPENHOS_BLOQUEADOS, $params);
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
        return $this->siarg > 0 ? $this->siarg : null;
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
        return $this->responsavelCadastramentoUnidadeId > 0 ? $this->responsavelCadastramentoUnidadeId : null;
    }
    
    public function getResponsavelCadastramentoUnidadeSigla(): ?string
    {
        return $this->responsavelCadastramentoUnidadeSigla;
    }

    public function getDataAteste(): ?DateTime
    {
        return $this->dataAteste;
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
        return $this->responsavelAtesteUnidadeId > 0 ? $this->responsavelAtesteUnidadeId : null;
    }
    
    public function getResponsavelAtesteUnidadeSigla(): ?string
    {
        return $this->responsavelAtesteUnidadeSigla;
    }

    public function getFimVigencia(): ?DateTime
    {
        return $this->fimVigencia;
    }

    public function getResponsavelFimVigenciaId(): ?string
    {
        return $this->responsavelFimVigenciaId;
    }
    
    public function getResponsavelFimVigenciaNome(): ?string
    {
        return $this->responsavelFimVigenciaNome;
    }
    
    public function getResponsavelFimVigenciaUnidadeId(): ?int
    {
        return $this->responsavelFimVigenciaUnidadeId > 0 ? $this->responsavelFimVigenciaUnidadeId : null;
    }
    
    public function getResponsavelFimVigenciaUnidadeSigla(): ?string
    {
        return $this->responsavelFimVigenciaUnidadeSigla;
    }

    public function getEmpenhosBloqueados(): int
    {
        return $this->empenhosBloqueados;
    }

    public function setResponsavelCadastramento(UserDomain $user): void
    {
        $this->responsavelCadastramentoId = $user->getRegistration();
        $this->responsavelCadastramentoNome = $user->getName();
        $this->responsavelCadastramentoUnidadeId = $user->getPhysicalLotationId();
        $this->responsavelCadastramentoUnidadeSigla = $user->getPhysicalLotationAbbreviation();
    }

    public function setResponsavelAteste(UserDomain $user): void
    {
        $this->dataAteste = new DateTime();
        $this->responsavelAtesteId = $user->getRegistration();
        $this->responsavelAtesteNome = $user->getName();
        $this->responsavelAtesteUnidadeId = $user->getPhysicalLotationId();
        $this->responsavelAtesteUnidadeSigla = $user->getPhysicalLotationAbbreviation();
    }

    public function unsetEmpenhosBloqueados(): void
    {
        unset($this->empenhosBloqueados);
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
        $v->setName(self::DATA_ATESTE)->isInstanceOf($this->getDataAteste(), DateTime::class);
        $v->setName(self::RESPONSAVEL_ATESTE_UNIDADE_ID)->setValue($this->getResponsavelUnidadeId())->required();
        $v->setName(self::RESPONSAVEL_ATESTE_UNIDADE_ID)->isInt($this->getResponsavelUnidadeId());
        $v->setName(self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_ID)->setValue($this->getResponsavelUnidadeId())->required();
        $v->setName(self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_ID)->isInt($this->getResponsavelUnidadeId());
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
            self::DATA_ATESTE => $this->dateTimeToString($this->getDataAteste()),
            self::RESPONSAVEL_ATESTE_ID => $this->getResponsavelAtesteId(),
            self::RESPONSAVEL_ATESTE_NOME => $this->getResponsavelAtesteNome(),
            self::RESPONSAVEL_ATESTE_UNIDADE_ID => $this->getResponsavelAtesteUnidadeId(),
            self::RESPONSAVEL_ATESTE_UNIDADE_SIGLA => $this->getResponsavelAtesteUnidadeSigla(),
            self::FIM_VIGENCIA => $this->dateTimeToString($this->getFimVigencia()),
            self::RESPONSAVEL_FIM_VIGENCIA_ID => $this->getResponsavelFimVigenciaId(),
            self::RESPONSAVEL_FIM_VIGENCIA_NOME => $this->getResponsavelFimVigenciaNome(),
            self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_ID => $this->getResponsavelFimVigenciaUnidadeId(),
            self::RESPONSAVEL_FIM_VIGENCIA_UNIDADE_SIGLA => $this->getResponsavelFimVigenciaUnidadeSigla(),
        ];

        if (isset($this->empenhosBloqueados)) {
            $serialization[self::EMPENHOS_BLOQUEADOS] = $this->getEmpenhosBloqueados();
        }

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
