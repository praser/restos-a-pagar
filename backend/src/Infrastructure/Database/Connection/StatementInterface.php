<?php

declare(strict_types=1);

namespace App\Infrastructure\Database\Connection;

interface StatementInterface
{
    public const PARAM_NULL = 0;
    public const PARAM_INT = 1;
    public const PARAM_STR = 2;
    public const PARAM_BOOL = 5;

    public function bindValue(string $parameter, $value, int $dataType = StatementInterface::PARAM_STR): bool;
    public function execute(array $inputParameters = null): bool;
    public function fetchAll(): array;
    public function fetch(): array;
    public function rowCount(): int;
}
