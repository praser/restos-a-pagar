<?php

namespace App\Domain;

use DateTime;

class ParametrosDomain extends DomainBase
{
    public const ANO_EXECUCAO = 'anoExecucao';
    public const ANO_ORCAMENTARIO = 'anoOrcamentario';
    private const RP_NAO_PROCESSADOS_A_LIQUIDAR_PCASP_ID = 'rpNaoProcessadosALiquidarPcaspId';
    private const RP_NAO_PROCESSADOS_BLOQUEADOS_PCASP_ID = 'rpNaoProcessadosBloqueadosPcaspId';
    private const RP_NAO_PROCESSADOS_CANCELADOS_PCASP_ID = 'rpNaoProcessadosCanceladosPcaspId';
    private const SAUDE_UG_ID = 'saudeUgId';
    private const ORCAMENTO_IMPOSITIVO_TIPO_RESULTADO_PRIMARIO_ID =  'orcamentoImpositivoTipoResultadoPrimarioId';
    public const DATA_BLOQUEIO = 'dataBloqueio';
    public const DATA_CANCELAMENTO = 'dataCancelamento';
    public const DIAS_ATE_BLOQUEIO = 'diasAteBloqueio';
    public const DIAS_ATE_CANCELAMENTO = 'diasAteCancelamento';

    private $anoExecucao;
    private $anoOrcamentario;
    private $rpNaoProcessadosALiquidarPcaspId;
    private $rpNaoProcessadosBloqueadosPcaspId;
    private $rpNaoProcessadosCanceladosPcaspId;
    private $saudeUgId;
    private $orcamentoImpositivoTipoResultadoPrimarioId;
    private $dataBloqueio;
    private $dataCancelamento;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->anoExecucao = (int) $this->setAttribute(self::ANO_EXECUCAO, $params);
        $this->anoOrcamentario = (int) $this->setAttribute(self::ANO_ORCAMENTARIO, $params);
        $this->rpNaoProcessadosALiquidarPcaspId = (int) $this->setAttribute(self::RP_NAO_PROCESSADOS_A_LIQUIDAR_PCASP_ID, $params);
        $this->rpNaoProcessadosBloqueadosPcaspId = (int) $this->setAttribute(self::RP_NAO_PROCESSADOS_BLOQUEADOS_PCASP_ID, $params);
        $this->rpNaoProcessadosCanceladosPcaspId = (int) $this->setAttribute(self::RP_NAO_PROCESSADOS_CANCELADOS_PCASP_ID, $params);
        $this->saudeUgId = (int) $this->setAttribute(self::SAUDE_UG_ID, $params);
        $this->orcamentoImpositivoTipoResultadoPrimarioId = (int) $this->setAttribute(self::ORCAMENTO_IMPOSITIVO_TIPO_RESULTADO_PRIMARIO_ID, $params);
        $this->dataBloqueio = $this->parseDateTime($params[self::DATA_BLOQUEIO], self::DATE_Y_M_D);
        $this->dataCancelamento = $this->parseDateTime($params[self::DATA_CANCELAMENTO], self::DATE_Y_M_D);
    }

    public function getAnoExecucao(): ?int
    {
        return $this->anoExecucao;
    }

    public function getAnoOrcamentario(): ?int
    {
        return $this->anoOrcamentario;
    }

    public function getRpNaoProcessadosALiquidarPcaspId(): ?int
    {
        return $this->rpNaoProcessadosALiquidarPcaspId;
    }

    public function getRpNaoProcessadosBloqueadosPcaspId(): ?int
    {
        return $this->rpNaoProcessadosBloqueadosPcaspId;
    }

    public function getRpNaoProcessadosCanceladosPcaspId(): ?int
    {
        return $this->rpNaoProcessadosCanceladosPcaspId;
    }

    public function getSaudeUgId(): ?int
    {
        return $this->saudeUgId;
    }

    public function getOrcamentoImpositivoTipoResultadoPrimarioId(): ?int
    {
        return $this->orcamentoImpositivoTipoResultadoPrimarioId;
    }

    public function getDataBloqueio(): ?DateTime
    {
        return $this->dataBloqueio;
    }

    public function getDataCancelamento(): ?DateTime
    {
        return $this->dataCancelamento;
    }

    private function countDias(DateTime $dataFim): ?int
    {
        $date = $dataFim;
        if ($date) {
            $dias = $date->diff(new DateTime())->format('%a');
            return $dias > 0 ? $dias : 0;
        }
        return null;
    }

    public function diasAteBloqueio(): ?int
    {
        return $this->countDias($this->getDataBloqueio());
    }

    public function diasAteCancelamento(): ?int
    {
        return $this->countDias($this->getDataCancelamento());
    }

    public function jsonSerialize(): array
    {
        $serializarion = [
            self::ANO_EXECUCAO => $this->getAnoExecucao(),
            self::ANO_ORCAMENTARIO => $this->getAnoOrcamentario(),
            self::RP_NAO_PROCESSADOS_A_LIQUIDAR_PCASP_ID => $this->getRpNaoProcessadosALiquidarPcaspId(),
            self::RP_NAO_PROCESSADOS_BLOQUEADOS_PCASP_ID => $this->getRpNaoProcessadosBloqueadosPcaspId(),
            self::RP_NAO_PROCESSADOS_CANCELADOS_PCASP_ID => $this->getRpNaoProcessadosCanceladosPcaspId(),
            self::SAUDE_UG_ID => $this->getSaudeUgId(),
            self::ORCAMENTO_IMPOSITIVO_TIPO_RESULTADO_PRIMARIO_ID => $this->getOrcamentoImpositivoTipoResultadoPrimarioId(),
            self::DATA_BLOQUEIO => $this->dateTimeToString($this->getDataBloqueio()),
            self::DATA_CANCELAMENTO => $this->dateTimeToString($this->getDataCancelamento()),
            self::DIAS_ATE_BLOQUEIO => $this->diasAteBloqueio(),
            self::DIAS_ATE_CANCELAMENTO => $this->diasAteCancelamento(),
        ];

        return array_merge(parent::jsonSerialize(), $serializarion);
    }
}
