<?php

declare(strict_types=1);

namespace App\Domain;

class EmpenhoDomain extends DomainBase
{
    public const OPERACAO = 'operacao';
    public const CONVENIO = 'convenio';
    public const GIGOV_NOME = 'gigovNome';
    public const SIGLA_GESTOR = 'siglaGestor';
    public const PROPONENTE = 'proponente';
    public const DOCUMENTO = 'documento';
    public const SALDO = 'saldo';
    public const LOTE_DESBLOQUEIO = 'loteDesbloqueio';
    public const DATA_DESBLOQUEIO = 'dataDesbloqueio';
    public const SITUACAO = 'situacao';
    public const ANO_EXECUCAO = 'anoExecucao';

    private $operacao;
    private $convenio;
    private $gigovNome;
    private $siglaGestor;
    private $proponente;
    private $documento;
    private $saldo;
    private $loteDesbloqueio;
    private $dataDesbloqueio;
    private $situacao;
    private $anoExecucao;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this
            ->setOperacao((int) $this->setAttribute(self::OPERACAO, $params))
            ->setConvenio((int) $this->setAttribute(self::CONVENIO, $params))
            ->setGigovNome($this->setAttribute(self::GIGOV_NOME, $params))
            ->setSiglaGestor($this->setAttribute(self::SIGLA_GESTOR, $params))
            ->setProponente($this->setAttribute(self::PROPONENTE, $params))
            ->setDocumento($this->setAttribute(self::DOCUMENTO, $params))
            ->setSaldo((float) $this->setAttribute(self::SALDO, $params))
            ->setLoteDesbloqueio($this->setAttribute(self::LOTE_DESBLOQUEIO, $params))
            ->setDataDesbloqueio($this->parseDateTime($params[self::DATA_DESBLOQUEIO]))
            ->setSituacao($this->setAttribute(self::SITUACAO, $params))
            ->setAnoExecucao((int) $this->setAttribute(self::ANO_EXECUCAO, $params));
    }

    

    /**
     * Get the value of operacao
     */
    public function getOperacao()
    {
        return $this->operacao;
    }

    /**
     * Set the value of operacao
     *
     * @return  self
     */
    public function setOperacao($operacao)
    {
        $this->operacao = $operacao;

        return $this;
    }

    /**
     * Get the value of convenio
     */
    public function getConvenio()
    {
        return $this->convenio;
    }

    /**
     * Set the value of convenio
     *
     * @return  self
     */
    public function setConvenio($convenio)
    {
        $this->convenio = $convenio;

        return $this;
    }

    /**
     * Get the value of gigovNome
     */
    public function getGigovNome()
    {
        return $this->gigovNome;
    }

    /**
     * Set the value of gigovNome
     *
     * @return  self
     */
    public function setGigovNome($gigovNome)
    {
        $this->gigovNome = $gigovNome;

        return $this;
    }

    /**
     * Get the value of siglaGestor
     */
    public function getSiglaGestor()
    {
        return $this->siglaGestor;
    }

    /**
     * Set the value of siglaGestor
     *
     * @return  self
     */
    public function setSiglaGestor($siglaGestor)
    {
        $this->siglaGestor = $siglaGestor;

        return $this;
    }

    /**
     * Get the value of proponente
     */
    public function getProponente()
    {
        return $this->proponente;
    }

    /**
     * Set the value of proponente
     *
     * @return  self
     */
    public function setProponente($proponente)
    {
        $this->proponente = $proponente;

        return $this;
    }

    /**
     * Get the value of documento
     */
    public function getDocumento()
    {
        return $this->documento;
    }

    /**
     * Set the value of documento
     *
     * @return  self
     */
    public function setDocumento($documento)
    {
        $this->documento = $documento;

        return $this;
    }

    /**
     * Get the value of saldo
     */
    public function getSaldo()
    {
        return $this->saldo;
    }

    /**
     * Set the value of saldo
     *
     * @return  self
     */
    public function setSaldo($saldo)
    {
        $this->saldo = $saldo;

        return $this;
    }

    /**
     * Get the value of loteDesbloqueio
     */
    public function getLoteDesbloqueio()
    {
        return $this->loteDesbloqueio;
    }

    /**
     * Set the value of loteDesbloqueio
     *
     * @return  self
     */
    public function setLoteDesbloqueio($loteDesbloqueio)
    {
        $this->loteDesbloqueio = $loteDesbloqueio;

        return $this;
    }

    /**
     * Get the value of dataDesbloqueio
     */
    public function getDataDesbloqueio()
    {
        return $this->dataDesbloqueio;
    }

    /**
     * Set the value of dataDesbloqueio
     *
     * @return  self
     */
    public function setDataDesbloqueio($dataDesbloqueio)
    {
        $this->dataDesbloqueio = $dataDesbloqueio;

        return $this;
    }

    /**
     * Get the value of situacao
     */
    public function getSituacao()
    {
        return $this->situacao;
    }

    /**
     * Set the value of situacao
     *
     * @return  self
     */
    public function setSituacao($situacao)
    {
        $this->situacao = $situacao;

        return $this;
    }

    /**
     * Get the value of anoExecucao
     */
    public function getAnoExecucao()
    {
        return $this->anoExecucao;
    }

    /**
     * Set the value of anoExecucao
     *
     * @return  self
     */
    public function setAnoExecucao($anoExecucao)
    {
        $this->anoExecucao = $anoExecucao;

        return $this;
    }

    public function jsonSerialize()
    {
        $serialization = [
            self::OPERACAO => $this->getOperacao(),
            self::CONVENIO => $this->getConvenio(),
            self::GIGOV_NOME => $this->getGigovNome(),
            self::SIGLA_GESTOR => $this->getSiglaGestor(),
            self::PROPONENTE => $this->getProponente(),
            self::DOCUMENTO => $this->getDocumento(),
            self::SALDO => $this->getSaldo(),
            self::LOTE_DESBLOQUEIO => $this->getLoteDesbloqueio(),
            self::DATA_DESBLOQUEIO => $this->dateTimeToString($this->getDataDesbloqueio()),
            self::SITUACAO => $this->getSituacao(),
            self::ANO_EXECUCAO => $this->getAnoExecucao(),
        ];
        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
