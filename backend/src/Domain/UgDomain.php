<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Domain;

class UgDomain extends DomainBase
{
    public const CODIGO = 'codigo';
    public const NOME = 'nome';
    public const NOME_GESTOR = 'nomeGestor';
    public const SIGLA_GESTOR = 'siglaGestor';

    private $codigo;
    private $nome;
    private $nomeGestor;
    private $siglaGestor;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->setCodigo((int) $this->setAttribute(self::CODIGO, $params));
        $this->setNome((string) $this->setAttribute(self::NOME, $params));
        $this->setNomeGestor((string) $this->setAttribute(self::NOME_GESTOR, $params));
        $this->setSiglaGestor((string) $this->setAttribute(self::SIGLA_GESTOR, $params));
    }

    public function getCodigo(): int
    {
        return $this->codigo;
    }

    public function setCodigo(int $codigo): void
    {
        $this->codigo = $codigo;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }

    public function getNomeGestor(): ?string
    {
        return $this->nomeGestor;
    }

    public function setNomeGestor(string $nomeGestor): void
    {
        $this->nomeGestor = $nomeGestor;
    }

    public function getSiglaGestor(): ?string
    {
        return $this->siglaGestor;
    }

    public function setSiglaGestor(string $siglaGestor): void
    {
        $this->siglaGestor = $siglaGestor;
    }



    public function jsonSerialize()
    {
        $serialization = [
            self::CODIGO => $this->getCodigo(),
            self::NOME => $this->getNome(),
            self::NOME_GESTOR => $this->getNomeGestor(),
            self::SIGLA_GESTOR => $this->getSiglaGestor(),
        ];

        return array_merge(parent::jsonSerialize(), $serialization);
    }
}
