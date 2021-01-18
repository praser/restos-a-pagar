<?php

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
        $this->name = getenv('API_NAME');
        $this->description = getenv('API_DESCRIPTION');
        $this->docs = getenv('API_DOCS_URL');
        $this->source = getenv('API_SOURCE_URL');
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
