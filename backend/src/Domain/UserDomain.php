<?php

declare(strict_types=1);

namespace App\Domain;

use DateTime;

class UserDomain extends DomainBase
{
    private const CPF = 'cpf';
    private const REGISTRATION = 'registration';
    private const NAME = 'name';
    private const PHOTO = 'photo';
    private const PHYSICAL_LOTATION_ABBREVIATION = 'physicalLotationAbbreviation';
    private const PHYSICAL_LOTATION_ID = 'physicalLotationId';

    private $cpf;
    private $registration;
    private $name;
    private $photo;
    private $physicalLotationAbbreviation;
    private $physicalLotationId;

    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->cpf = (string) $this->setAttribute(self::CPF, $params);
        
        $this->registration = (string) $this->setAttribute(self::ID, $params);
        
        $this->name = (string) $this->setAttribute(self::NAME, $params);
        
        $this->photo = (string) $this->setAttribute(self::PHOTO, $params);
    
        $this->physicalLotationAbbreviation =
            (string) $this->setAttribute(self::PHYSICAL_LOTATION_ABBREVIATION, $params);
        
        $this->phisicalLotationId = (int) $this->setAttribute(self::PHYSICAL_LOTATION_ID, $params);
    }

    public function getCpf(): string
    {
        return $this->cpf;
    }

    public function getRegistration(): string
    {
        return $this->registration;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPhoto(): string
    {
        return $this->photo;
    }

    public function getPhysicalLotationAbbreviation(): string
    {
        return $this->physicalLotationAbbreviation;
    }

    public function getPhysicalLotationId(): int
    {
        return $this->phisicalLotationId;
    }


    public function jsonSerialize()
    {
        return array(
        self::CPF => $this->getCpf(),
        self::REGISTRATION => $this->getRegistration(),
        self::NAME => $this->getName(),
        self::PHOTO => $this->getPhoto(),
        self::PHYSICAL_LOTATION_ABBREVIATION => $this->getPhysicalLotationAbbreviation(),
        self::PHYSICAL_LOTATION_ID => $this->getPhysicalLotationId(),
        );
    }
}
