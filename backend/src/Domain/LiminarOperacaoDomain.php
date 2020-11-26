<?php

namespace App\Domain;

class LiminarOperacaoDomain extends DomainBase
{
    private const LIMINAR_ID = 'liminarId';
    public const OPERACAO_ID = 'operacaoId';
    
    private $liminarId;
    private $operacaoId;
    
    public function __construct(array $params = [])
    {
        parent::__construct($params);
        $this->liminarId = (int) $this->setAttribute(self::LIMINAR_ID, $params);
        $this->operacaoId = (int) $this->setAttribute(self::OPERACAO_ID, $params);
    }
    
    public function getLiminarId() : ?int
    {
        return $this->liminarId;
    }
    
    public function setLiminarId(int $liminarId) : LiminarOperacaoDomain
    {
        $this->liminarId = $liminarId;
        return $this;
    }
    
    public function getOperacaoId() : ?int
    {
        return $this->operacaoId;
    }
    
    public function setOperacaoId(int $operacaoId) : LiminarOperacaoDomain
    {
        $this->operacaoId = $operacaoId;
        return $this;
    }
    
    public function isValid(): bool
    {
        $v = $this->validator;
        $v->setName(self::LIMINAR_ID)->setValue($this->getLiminarId())->required();
        $v->setName(self::LIMINAR_ID)->isInt($this->getLiminarId());
        $v->setName(self::OPERACAO_ID)->setValue($this->getOperacaoId())->required();
        $v->setName(self::OPERACAO_ID)->isInt($this->getOperacaoId());

        return $v->isSuccess();
    }
    
    public function jsonSerialize(): array
    {
        $serialization = [
            self::LIMINAR_ID => $this->getLiminarId(),
            self::OPERACAO_ID => $this->getOperacaoId(),
        ];
        
        return array_merge(parent::jsonSerialize(), $serialization);
    }
}