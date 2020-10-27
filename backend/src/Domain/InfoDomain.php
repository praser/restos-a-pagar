<?php

/** @noinspection PhpUnused */

namespace App\Domain;

use DateTime;

class InfoDomain extends DomainBase
{
    public const NAME = 'name';
    public const DESCRIPTION = 'description';
    private const DOCS = 'docs';
    private const SOURCE = 'source';
    public const DATABASE_POSITION = 'databasePosition';
    public const DATABASE_LAST_UPDATE =  'databaseLastUpdate';
  

    private $name;
    private $description;
    private $docs;
    private $source;
    private $databasePosition;
    private $databaseLastUpdate;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->name = "API Restos a Pagar";
        $this->descriotion = "API que fornece dados e informações das operações e notas de empenho que possuem saldo inscrito em restos a pagar";
        $this->docs = "https://anonimous.postman.co/collections/1406279-22655d3a-c6b7-4d0e-8880-49a0534d012d?version=latest&workspace=d72067b3-4f80-4a60-bfa7-2eb279b0cdd8#278e220d-13fe-4545-a137-4b8a2a6de591";
        $this->source = "https://github.com/praser/restos-a-pagar";
        $this->databasePosition = $params[self::DATABASE_POSITION];
        $this->databaseLastUpdate = $params[self::DATABASE_LAST_UPDATE];
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getDocs(): ?string
    {
        return $this->docs;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function getDatabasePosition(): ?string
    {
        return $this->databasePosition;
    }

    public function getDatabaseLastUpdate(): ?string
    {
        return $this->databaseLastUpdate;
    }

    public function jsonSerialize(): array
    {
        $serializarion = [
            self::NAME => $this->getName(),
            self::DESCRIPTION => $this->getDescription(),
            self::DOCS => $this->getDocs(),
            self::SOURCE => $this->getSource(),
            self::DATABASE_POSITION => $this->getDatabasePosition(),
            self::DATABASE_LAST_UPDATE => $this->getDatabaseLastUpdate(),
        ];

        return $serializarion;
    }
}