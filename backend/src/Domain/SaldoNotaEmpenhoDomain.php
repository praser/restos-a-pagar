<?php /** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class SaldoNotaEmpenhoDomain extends DomainBase
{
    protected const PCASP_ID = 'pcaspId';
    protected const UG_ID = 'ugId';
    public const OPERACAO_ID = 'operacaoId';
    protected const TIPO_RESULTADO_PRIMARIO_ID = 'tipoResultadoPrimarioId';
    protected const ANO_ORCAMENTARIO = 'anoOrcamentario';
    protected const DOCUMENTO = 'documento';
    protected const PTRES = 'ptres';
    protected const DATA_EMISSAO = 'dataEmissao';
    protected const SALDO = 'saldoContaContabil';
    protected const CONTROLE_ARQUIVO_ID = 'controleArquivoId';
    protected const DATA_REFERENCIA = 'dataReferencia';

    private $pcaspId;
    private $ugId;
    private $operacaoId;
    private $tipoResultadoPrimarioId;
    private $anoOrcamentario;
    private $documento;
    private $ptres;
    private $dataEmissao;
    private $saldo;
    private $controleArquivoId;
    private $dataReferencia;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->pcaspId = (int) $this->setAttribute(self::PCASP_ID, $params);
        $this->ugId = (int) $this->setAttribute(self::UG_ID, $params);
        $this->operacaoId = (int) $this->setAttribute(self::OPERACAO_ID, $params);
        $this->tipoResultadoPrimarioId = (int) $this->setAttribute(self::TIPO_RESULTADO_PRIMARIO_ID, $params);
        $this->anoOrcamentario = (int) $this->setAttribute(self::ANO_ORCAMENTARIO, $params);
        $this->documento = (string) $this->setAttribute(self::DOCUMENTO, $params);
        $this->ptres = (int) $this->setAttribute(self::PTRES, $params);
        $this->setDataEmissao((string) $this->setAttribute(self::DATA_EMISSAO, $params));
        $this->saldo = (float) $this->setAttribute(self::SALDO, $params);
        $this->controleArquivoId = (int) $this->setAttribute(self::CONTROLE_ARQUIVO_ID, $params);
        $this->dataReferencia = $this->parseDateTime($params[self::DATA_REFERENCIA], self::DATE_Y_M_D);
    }

    public function getPcaspId(): ?int
    {
        return $this->pcaspId;
    }

    public function setPcasp(DomainInterface $pcasp): void
    {
        !$pcasp ?: $this->pcaspId = $pcasp->getId();
    }

    public function getUgId(): ?int
    {
        return $this->ugId;
    }

    public function setUg(DomainInterface $ug): void
    {
        !$ug ?: $this->ugId = $ug->getId();
    }

    public function getOperacaoId(): ?int
    {
        return $this->operacaoId;
    }

    public function setOperacao(DomainInterface $operacao): void
    {
        !$operacao ?: $this->operacaoId = $operacao->getId();
    }

    public function getTipoResultadoPrimarioId(): int
    {
        return $this->tipoResultadoPrimarioId;
    }

    public function setTipoResultadoPrimario(DomainInterface $tipoResultadoPrimario): void
    {
        !$tipoResultadoPrimario ?: $this->tipoResultadoPrimarioId = $tipoResultadoPrimario->getId();
    }

    public function getAnoOrcamentario(): ?int
    {
        return $this->anoOrcamentario;
    }

    public function getDocumento(): ?string
    {
        return $this->documento;
    }

    public function getPtres(): ?int
    {
        return $this->ptres;
    }

    public function getDataEmissao(): ?DateTime
    {
        return $this->dataEmissao;
    }

    public function setDataEmissao(string $dateTime): void
    {
        $this->dataEmissao = $this->parseDateTime($dateTime, DomainBase::DATE_Y_M_D);
    }

    public function getSaldo(): ?float
    {
        return $this->saldo;
    }

    public function getControleArquivoId(): ?int
    {
        return $this->controleArquivoId;
    }

    public function getDataReferencia(): ?DateTime
    {
        return $this->dataReferencia;
    }

    public function isValid(): bool
    {
        $v = $this->validator;
        $v->setName(self::PCASP_ID)->setValue($this->getPcaspId())->required();
        $v->setName(self::PCASP_ID)->isInt($this->getPcaspId());
        $v->setName(self::UG_ID)->setValue($this->getUgId())->required();
        $v->setName(self::UG_ID)->isInt($this->getUgId());
        $v->setName(self::OPERACAO_ID)->setValue($this->getOperacaoId())->required();
        $v->setName(self::OPERACAO_ID)->isInt($this->getOperacaoId());
        $v->setName(self::TIPO_RESULTADO_PRIMARIO_ID)->setValue($this->getOperacaoId())->required();
        $v->setName(self::TIPO_RESULTADO_PRIMARIO_ID)->isInt($this->getOperacaoId());
        $v->setName(self::ANO_ORCAMENTARIO)->setValue($this->getAnoOrcamentario())->required();
        $v->setName(self::ANO_ORCAMENTARIO)->isInt($this->getAnoOrcamentario());
        $v->setName(self::DOCUMENTO)->setValue($this->getDocumento())->customPattern('\d{4}NE\d{6}')->required();
        $v->setName(self::PTRES)->setValue($this->getOperacaoId())->required();
        $v->setName(self::PTRES)->isInt($this->getOperacaoId());
        $v->setName(self::DATA_EMISSAO)->setValue($this->getDataEmissao())->required();
        $v->setName(self::DATA_EMISSAO)->isInstanceOf($this->getDataEmissao(), DateTime::class);
        $v->setName(self::SALDO)->setValue($this->getSaldo())->required();
        $v->setName(self::SALDO)->isFloat($this->getSaldo());

        return $v->isSuccess();
    }

    public function jsonSerialize(): array
    {
        $serialization = [
            self::PCASP_ID => $this->getPcaspId(),
            self::UG_ID => $this->getUgId(),
            self::OPERACAO_ID => $this->getOperacaoId(),
            self::TIPO_RESULTADO_PRIMARIO_ID => $this->getTipoResultadoPrimarioId(),
            self::ANO_ORCAMENTARIO => $this->getAnoOrcamentario(),
            self::DOCUMENTO => $this->getDocumento(),
            self::PTRES => $this->getPtres(),
            self::DATA_EMISSAO => $this->getDataEmissao() ? $this->getDataEmissao()
                ->format(DomainBase::DATE_Y_M_D) : null,
            self::SALDO => $this->getSaldo(),
            self::CREATED_AT => $this->getCreatedAt() ? $this->getCreatedAt()
                ->format(DomainBase::DATE_Y_M_D_H_I_S) : null,
            self::UPDATED_AT => $this->getUpdatedAt() ? $this->getUpdatedAt()
                ->format(DomainBase::DATE_Y_M_D_H_I_S) : null,
            self::CONTROLE_ARQUIVO_ID => $this->getControleArquivoId(),
            self::DATA_REFERENCIA => $this->dateTimeToString($this->getDataReferencia()),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
