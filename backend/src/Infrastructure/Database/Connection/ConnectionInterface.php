<?php

declare(strict_types=1);

namespace App\Infrastructure\Database\Connection;

interface ConnectionInterface
{
    public function __construct (string $dsn, string $username = null, string  $passwd = null, array $options = null);
    public function prepare(string $sql, array $driverOptions = array()): StatementInterface;
    public function beginTransaction (): bool;
    public function commit ():bool;
    public function rollBack (): bool;
    public function lastInsertId(): ?int;
}