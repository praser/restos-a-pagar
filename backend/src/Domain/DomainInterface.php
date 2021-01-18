<?php

declare(strict_types=1);

namespace App\Domain;

use JsonSerializable;
use DateTime;

interface DomainInterface extends JsonSerializable
{
    public function getId(): ?int;

    public function setId(int $id): void;

    public function getCreatedAt(): ?DateTime;

    public function setCreatedAt(DateTime $createdAt): void;

    public function getUpdatedAt(): ?DateTime;

    public function setUpdatedAt(DateTime $updatedAt): void;

    public function isValid(): bool;

    public function getErrors(): array;
}
