<?php

declare(strict_types=1);

namespace App\Domain;

class PcaspDomain extends DomainBase
{
    private const CLASSE = 'classe';
    private const GRUPO = 'grupo';
    private const SUBGRUPO = 'subgrupo';
    private const TITULO = 'titulo';
    private const SUBTITULO = 'subtitulo';
    private const ITEM = 'item';
    private const SUBITEM = 'subitem';
    private const CONTA = 'conta';
    private const TITULO_CONTA = 'tituloConta';
    private const FUNCAO = 'funcao';
    private const NATUREZA_SALDO = 'naturezaSaldo';
    private const ANO = 'ano';

    private $classe;
    private $grupo;
    private $subgrupo;
    private $titulo;
    private $subtitulo;
    private $item;
    private $subitem;
    private $conta;
    private $tituloConta;
    private $funcao;
    private $naturezaSaldo;
    private $ano;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->classe = (int) $this->setAttribute(self::CLASSE, $params);
        $this->grupo = (int) $this->setAttribute(self::GRUPO, $params);
        $this->subgrupo = (int) $this->setAttribute(self::SUBGRUPO, $params);
        $this->titulo = (int) $this->setAttribute(self::TITULO, $params);
        $this->subtitulo = (int) $this->setAttribute(self::SUBTITULO, $params);
        $this->item = (int) $this->setAttribute(self::ITEM, $params);
        $this->subitem = (int) $this->setAttribute(self::SUBITEM, $params);
        $this->conta = (int) $this->setAttribute(self::CONTA, $params);
        $this->tituloConta = (string) $this->setAttribute(self::TITULO_CONTA, $params);
        $this->funcao = (string) $this->setAttribute(self::FUNCAO, $params);
        $this->naturezaSaldo = $this->setAttribute(self::NATUREZA_SALDO, $params);
        $this->ano = (int) $this->setAttribute(self::ANO, $params);
    }

    public function getClasse(): int
    {
        return $this->classe;
    }

    public function getGrupo(): int
    {
        return $this->grupo;
    }

    public function getSubgrupo(): int
    {
        return $this->subgrupo;
    }

    public function getTitulo(): int
    {
        return $this->titulo;
    }

    public function getSubtitulo(): int
    {
        return $this->subtitulo;
    }

    public function getItem(): int
    {
        return $this->item;
    }

    public function getSubitem(): int
    {
        return $this->subitem;
    }

    public function getConta(): int
    {
        return $this->conta;
    }

    public function getTituloConta(): ?string
    {
        return $this->tituloConta;
    }

    public function getFuncao(): string
    {
        return $this->funcao;
    }

    public function getNaturezaSaldo(): ?string
    {
        return $this->naturezaSaldo;
    }

    public function getAno(): int
    {
        return $this->ano;
    }

    public function jsonSerialize()
    {
        $serializartion = [
            self::CLASSE => $this->getClasse(),
            self::GRUPO => $this->getGrupo(),
            self::SUBGRUPO => $this->getSubgrupo(),
            self::TITULO => $this->getTitulo(),
            self::SUBTITULO => $this->getSubtitulo(),
            self::ITEM => $this->getItem(),
            self::SUBITEM => $this->getSubitem(),
            self::CONTA => $this->getConta(),
            self::TITULO_CONTA => $this->getTituloConta(),
            self::FUNCAO => $this->getFuncao(),
            self::NATUREZA_SALDO => $this->getNaturezaSaldo(),
            self::ANO => $this->getAno(),

        ];

        return array_merge(parent::jsonSerialize(), $serializartion);
    }
}
