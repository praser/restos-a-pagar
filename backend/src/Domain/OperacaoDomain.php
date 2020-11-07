<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class OperacaoDomain extends DomainBase
{
    public const ANO_EXECUCAO = 'anoExecucao';
    public const ANO_ORCAMENTARIO = 'anoOrcamentario';
    public const OPERACAO = 'operacao';
    public const DV = 'dv';
    public const PROPOSTA = 'proposta';
    public const ANO_PROPOSTA = 'anoProposta';
    public const ANO_ORCAMENTARIO_PROPOSTA = 'anoOrcamentarioProposta';
    public const CONVENIO = 'convenio';
    public const GIGOV_ID = 'gigovId';
    public const GIGOV_NOME = 'gigovNome';
    public const PROPONENTE = 'proponente';
    public const UF = 'uf';
    public const SIGLA_GESTOR = 'siglaGestor';
    public const NOME_GESTOR = 'nomeGestor';
    public const ENQUADRAMENTO_LEGISLACAO = 'enquadramentoLegislacao';
    public const ENQUADRAMENTO_LEGISLACAO_COMPLEMENTO = 'enquadramentoLegislacaoComplemento';
    public const SITUACAO_CONTRATO = 'situacaoContrato';
    public const SITUACAO_CONTRATO_COMPLEMENTO = 'situacaoContratoComplemento';
    public const PERCENTUAL_FISICO_AFERIDO = 'percentualFisicoAferido';
    public const PERCENTUAL_FINANCEIRO_DESBLOQUEADO = 'percentualFinanceiroDesbloqueado';
    public const DATA_VIGENCIA = 'dataVigencia';
    public const DATA_SPA = 'dataSPA';
    public const DATA_VRPL = 'dataVRPL';
    public const DATA_AIO = 'dataAIO';
    public const DATA_RETIRADA_SUSPENSIVA = 'dataRetiradaSuspensiva';
    public const DATA_CUMPRIMENTO_CRITERIOS_DESBLOQUEIO = 'dataCumprimentoCriteriosDesbloqueio';
    public const VALOR_REPASE = 'valorRepasse';
    public const OBJETO = 'objeto';
    public const VALOR_DESEMBOLSADO = 'valorDesembolsado';

    private $anoExecucao;
    private $anoOrcamentario;
    private $operacao;
    private $dv;
    private $proposta;
    private $anoProposta;
    private $anoOrcamentarioProposta;
    private $convenio;
    private $gigovId;
    private $gigovNome;
    private $proponente;
    private $uf;
    private $siglaGestor;
    private $nomeGestor;
    private $enquadramentoLegislacao;
    private $enquadramentoLegislacaoComplemento;
    private $situacaoContrato;
    private $situacaoContratoComplemento;
    private $percentualFisicoAferido;
    private $percentualFinanceiroDesbloqueado;
    private $dataVigencia;
    private $dataSPA;
    private $dataVRPL;
    private $dataAIO;
    private $dataRetiradaSsuspensiva;
    private $dataCumprimentoCriteriosDesbloqueio;
    private $valorRepasse;
    private $objeto;
    private $valorDesembolsado;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->anoExecucao = (int) $this->setAttribute(self::ANO_EXECUCAO, $params);
        $this->anoOrcamentario = (int) $this->setAttribute(self::ANO_ORCAMENTARIO, $params);
        $this->operacao = (int) $this->setAttribute(self::OPERACAO, $params);
        $this->dv = (int) $this->setAttribute(self::DV, $params);
        $this->proposta = (int) $this->setAttribute(self::PROPOSTA, $params);
        $this->anoProposta = (int) $this->setAttribute(self::ANO_PROPOSTA, $params);
        $this->anoOrcamentarioProposta = (int) $this->setAttribute(self::ANO_ORCAMENTARIO_PROPOSTA, $params);
        $this->convenio = (int) $this->setAttribute(self::CONVENIO, $params);
        $this->gigovId = (int) $this->setAttribute(self::GIGOV_ID, $params);
        $this->gigovNome = (string) $this->setAttribute(self::GIGOV_NOME, $params);
        $this->proponente = (string) $this->setAttribute(self::PROPONENTE, $params);
        $this->uf = (string) $this->setAttribute(self::UF, $params);
        $this->siglaGestor = (string) $this->setAttribute(self::SIGLA_GESTOR, $params);
        $this->nomeGestor = (string) $this->setAttribute(self::NOME_GESTOR, $params);
        $this->enquadramentoLegislacao = (string) $this->setAttribute(self::ENQUADRAMENTO_LEGISLACAO, $params);
        $this->enquadramentoLegislacaoComplemento = (string) $this->setAttribute(self::ENQUADRAMENTO_LEGISLACAO_COMPLEMENTO, $params);
        $this->situacaoContrato = (string) $this->setAttribute(self::SITUACAO_CONTRATO, $params);
        $this->situacaoContratoComplemento = (string) $this->setAttribute(self::SITUACAO_CONTRATO_COMPLEMENTO, $params);
        $this->percentualFisicoAferido = (float) $this->setAttribute(self::PERCENTUAL_FISICO_AFERIDO, $params);
        $this->percentualFinanceiroDesbloqueado = (float) $this->setAttribute(self::PERCENTUAL_FINANCEIRO_DESBLOQUEADO, $params);
        $this->dataVigencia = $this->parseDateTime($params[self::DATA_VIGENCIA], self::DATE_Y_M_D);
        $this->dataSPA = $this->parseDateTime($params[self::DATA_SPA], self::DATE_Y_M_D);
        $this->dataVRPL = $this->parseDateTime($params[self::DATA_VRPL], self::DATE_Y_M_D);
        $this->dataAIO = $this->parseDateTime($params[self::DATA_AIO], self::DATE_Y_M_D);
        $this->dataRetiradaSuspensiva = $this->parseDateTime($params[self::DATA_RETIRADA_SUSPENSIVA], self::DATE_Y_M_D);
        $this->dataCumprimentoCriteriosDesbloqueio = $this->parseDateTime($params[self::DATA_CUMPRIMENTO_CRITERIOS_DESBLOQUEIO], self::DATE_Y_M_D);
        $this->valorRepasse = (float) $this->setAttribute(self::VALOR_REPASE, $params);
        $this->objeto = (string) $this->setAttribute(self::OBJETO, $params);
        $this->valorDesembolsado = (float) $this->setAttribute(self::VALOR_DESEMBOLSADO, $params);
    }

    public function getAnoExecucao(): ?int
    {
        return $this->anoExecucao;
    }

    public function getAnoOrcamentario(): ?int
    {
        return $this->anoOrcamentario;
    }

    public function getOperacao(): int
    {
        return $this->operacao;
    }

    public function getDv(): int
    {
        return $this->dv;
    }

    public function getProposta(): ?int
    {
        return $this->proposta;
    }

    public function getAnoProposta(): ?int
    {
        return $this->anoProposta;
    }

    public function getAnoOrcamentarioProposta(): ?int
    {
        return $this->anoOrcamentarioProposta;
    }

    public function getConvenio(): ?int
    {
        return $this->convenio;
    }

    public function getGigovId(): ?int
    {
        return $this->gigovId;
    }

    public function getGigovNome(): ?string
    {
        return $this->gigovNome;
    }

    public function getProponente(): ?string
    {
        return $this->proponente;
    }

    public function getUf(): ?string
    {
        return $this->uf;
    }

    public function getSiglaGestor(): string
    {
        return $this->siglaGestor;
    }

    public function getNomeGestor(): string
    {
        return $this->nomeGestor;
    }

    public function getEnquadramentoLegislacao(): ?string
    {
        return $this->enquadramentoLegislacao;
    }

    public function getEnquadramentoLegislacaoComplemento(): ?string
    {
        return $this->enquadramentoLegislacaoComplemento;
    }

    public function getSituacaoContrato(): ?string
    {
        return $this->situacaoContrato;
    }

    public function getSituacaoContratoComplemento(): ?string
    {
        return $this->situacaoContratoComplemento;
    }

    public function getPercentualFisicoAferido(): ?float
    {
        return $this->percentualFisicoAferido;
    }

    public function getPercentualFinanceiroDesbloqueado(): ?float
    {
        return $this->percentualFinanceiroDesbloqueado;
    }

    public function getDataVigencia(): ?DateTime
    {
        return  $this->dataVigencia;
    }

    public function getDataSPA(): ?DateTime
    {
        return $this->dataSPA;
    }

    public function getDataVRPL(): ?DateTime
    {
        return $this->dataVRPL;
    }

    public function getDataAIO(): ?DateTime
    {
        return $this->dataAIO;
    }

    public function getDataRetiradaSuspensiva(): ?DateTime
    {
        return $this->dataRetiradaSuspensiva;
    }

    public function getDataCumprimentoCriteriosDesbloqueio(): ?DateTime
    {
        return $this->dataCumprimentoCriteriosDesbloqueio;
    }

    public function getValorRepasse(): ?float
    {
        return $this->valorRepasse;
    }

    public function getObjeto(): ?string
    {
        return $this->objeto;
    }

    public function getValorDesembolsado(): ?float
    {
        return $this->valorDesembolsado;
    }

    public function jsonSerialize(): array
    {
        $serializarion = [
            self::ANO_EXECUCAO => $this->getAnoExecucao(),
            self::ANO_ORCAMENTARIO => $this->getAnoOrcamentario(),
            self::OPERACAO => $this->getOperacao(),
            self::DV => $this->getDv(),
            self::PROPOSTA => $this->getProposta(),
            self::ANO_PROPOSTA => $this->getAnoProposta(),
            self::ANO_ORCAMENTARIO_PROPOSTA => $this->getAnoOrcamentarioProposta(),
            self::CONVENIO => $this->getConvenio(),
            self::GIGOV_ID => $this->getGigovId(),
            self::GIGOV_NOME => $this->getGigovNome(),
            self::PROPONENTE => $this->getProponente(),
            self::UF => $this->getUf(),
            self::SIGLA_GESTOR => $this->getSiglaGestor(),
            self::NOME_GESTOR => $this->getNomeGestor(),
            self::ENQUADRAMENTO_LEGISLACAO => $this->getEnquadramentoLegislacao(),
            self::ENQUADRAMENTO_LEGISLACAO_COMPLEMENTO => $this->getEnquadramentoLegislacaoComplemento(),
            self::SITUACAO_CONTRATO => $this->getSituacaoContrato(),
            self::SITUACAO_CONTRATO_COMPLEMENTO => $this->getSituacaoContratoComplemento(),
            self::PERCENTUAL_FISICO_AFERIDO => $this->getPercentualFisicoAferido(),
            self::PERCENTUAL_FINANCEIRO_DESBLOQUEADO => $this->getPercentualFinanceiroDesbloqueado(),
            self::DATA_VIGENCIA => $this->dateTimeToString($this->getDataVigencia()),
            self::DATA_SPA => $this->dateTimeToString($this->getDataSPA()),
            self::DATA_VRPL => $this->dateTimeToString($this->getDataVRPL()),
            self::DATA_AIO => $this->dateTimeToString($this->getDataAIO()),
            self::DATA_RETIRADA_SUSPENSIVA => $this->dateTimeToString($this->getDataRetiradaSuspensiva()),
            self::DATA_CUMPRIMENTO_CRITERIOS_DESBLOQUEIO => $this->dateTimeToString($this->getDataCumprimentoCriteriosDesbloqueio()),
            self::VALOR_REPASE => $this->getValorRepasse(),
            self::OBJETO => $this->getObjeto(),
            self::VALOR_DESEMBOLSADO => $this->getValorDesembolsado(),
        ];

        return array_merge(parent::jsonSerialize(), $serializarion);
    }
}
