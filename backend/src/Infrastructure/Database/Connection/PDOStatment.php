<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Infrastructure\Database\Connection;

use PDO;
use PDOStatement;

class PDOStatment implements StatementInterface
{
    private $pdoStatment;

    public function __construct(PDOStatement $pdoStatment)
    {
        $this->pdoStatment = $pdoStatment;
    }

    final public function bindValue(string $parameter, $value, int $dataType = StatementInterface::PARAM_STR): bool
    {
        return $this->pdoStatment->bindValue($parameter, $value, $dataType);
    }

    final public function execute(array $inputParams = null): bool
    {
        return $this->pdoStatment->execute($inputParams);
    }

    final public function fetchAll(): array
    {
        return $this->pdoStatment->fetchAll(PDO::FETCH_ASSOC);
    }

    final public function fetch(): array
    {
        $fetch = $this->pdoStatment->fetch(PDO::FETCH_ASSOC);

        return !is_bool($fetch) ? $fetch : array();
    }

    final public function rowCount(): int
    {
        return $this->pdoStatment->rowCount();
    }
}