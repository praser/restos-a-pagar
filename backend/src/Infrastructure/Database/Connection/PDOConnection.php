<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Infrastructure\Database\Connection;

use PDO;

class PDOConnection implements ConnectionInterface
{
    private $connection;

    public function __construct(string $dsn, string $username = null, string $passwd = null, array $options = null)
    {
        $this->connection = new PDO($dsn, $username, $passwd, $options);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function prepare(string $sql, array $driverOptions = array()): StatementInterface
    {
        return new PDOStatment($this->connection->prepare($sql, $driverOptions));
    }

    public function beginTransaction(): bool
    {
        return $this->connection->beginTransaction();
    }

    public function commit(): bool
    {
        return $this->connection->commit();
    }

    public function rollBack(): bool
    {
        return $this->connection->rollBack();
    }

    public function lastInsertId(): ?int
    {
        return (int) $this->connection->lastInsertId();
    }
}