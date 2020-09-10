<?php
/** @noinspection PhpUnused */

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Infrastructure\Database\Connection\ConnectionInterface;

interface DaoInterface
{
    public const COLUMN_KEY = 'COLUMN';

    public const VALUE_KEY = 'VALUE';

    public function getConnection(): ConnectionInterface;

    public function all(): ?array;

    public function find(string $id): ?DomainInterface;

    public function findBy(array $params): ?DomainInterface;

    public function create(DomainInterface $domain): bool;

    public function update(DomainInterface $domain): bool;

    public function delete(DomainInterface $domain): bool;
}