<?php

declare(strict_types=1);

    namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Infrastructure\Database\Connection\ConnectionInterface;
use App\Infrastructure\Database\Connection\StatementInterface;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;
use RuntimeException;
use NilPortugues\Sql\QueryBuilder\Builder\BuilderInterface;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

abstract class DaoBase implements DaoInterface
{
    protected const DATE_FORMAT_STR = 'Y-m-d H:i:s';
    protected const COL_ID = 'id';
    protected const COL_CREATED_AT = 'created_at';
    protected const COL_UPDATED_AT = 'updated_at';

    protected const TABLE = null;

    public const DESC = OrderBy::DESC;
    public const ASC = OrderBy::ASC;

    private $connection;
    private $logger;
    private $queryBuilder;

    protected $domain = null;

    public function __construct(ContainerInterface $c)
    {
        $this->connection = $c->get(ConnectionInterface::class);
        $this->logger = $c->get(LoggerInterface::class);
        $this->queryBuilder = $c->get('queryBuilder');
    }

    final public function getConnection(): ConnectionInterface
    {
        return $this->connection;
    }

    final public function getQueryBuilder(): BuilderInterface
    {
        return $this->queryBuilder;
    }

    final public function exceptionHandler(Exception $err): void
    {
        $this->logger->error($err->getMessage());
        $this->logger->error(json_encode($this->getQueryBuilder()->getValues(), JSON_THROW_ON_ERROR, 512));
        $this->logger->error($err->getTraceAsString());
        throw new RuntimeException('Dao exeception');
    }

    final public function all(array $orderBy = ['id', OrderBy::ASC], $table = null): ?array
    {
        try {
            $queryBuilder = $this->getQueryBuilder();
            $t = $table ? $table : static::TABLE;
            $query = $queryBuilder->select($t)->orderBy(...$orderBy);
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            $statment->execute();
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    final public function findAllBy(array $params, array $orderBy = ['id', OrderBy::ASC], $table = null): ?array
    {
        $t = $table ? $table : static::TABLE;
        try {
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder->select($t);
            foreach ($params as $param) {
                $query->where()->equals($param[DaoInterface::COLUMN_KEY], $param[DaoInterface::VALUE_KEY]);
            }
            $query->orderBy(...$orderBy);
            
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            $statment->execute($queryBuilder->getValues());
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    final public function find(string $id): ?DomainInterface
    {
        return $this->findBy([
            [DaoInterface::COLUMN_KEY => self::COL_ID, DaoInterface::VALUE_KEY => $id]
        ]);
    }

    final public function findBy(array $params): ?DomainInterface
    {
        try {
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder->select(static::TABLE);
            foreach ($params as $param) {
                $query->where()->equals($param[DaoInterface::COLUMN_KEY], $param[DaoInterface::VALUE_KEY]);
            }
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomain($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    final public function create(DomainInterface $domain): bool
    {
        try {
            $params = $this->prepareParams($domain->jsonSerialize());
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder->insert(static::TABLE)->setValues($params);
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            $result =  $statment->execute($queryBuilder->getValues());
            $lastInsertId = $this->getConnection()->lastInsertId();
            $domain->setId($lastInsertId);
            return $result;
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return false;
    }

    final public function update(DomainInterface $domain): bool
    {
        try {
            $params = $this->prepareParams($domain->jsonSerialize());
            $params[self::COL_UPDATED_AT] = new DateTime();
            foreach ($params as $key => $value) {
                if ($value instanceof DateTime) {
                    $params[$key] = date_format($value, self::DATE_FORMAT_STR);
                }
            }
            
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder
                ->update(static::TABLE)
                ->setValues($params)
                ->where()
                ->equals(self::COL_ID, $domain->getId())
                ->end();
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $statment->execute($queryBuilder->getValues());
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return false;
    }

    final public function delete(DomainInterface $domain): bool
    {
        try {
            $queryBuilder = $this->getQueryBuilder();
            $query = $queryBuilder
                ->delete(static::TABLE)
                ->where()
                ->equals(self::COL_ID, $domain->getId())
                ->end();
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $statment->execute($queryBuilder->getValues());
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return false;
    }

    private function instanciateDomain(array $params = []): DomainInterface
    {
        return new $this->domain($params);
    }

    protected function inflateDomain(StatementInterface $statment): ?DomainInterface
    {
        $queryBuilder = $this->getQueryBuilder();
        $statment->execute($queryBuilder->getValues());
        return $statment->rowCount() ? $this->instanciateDomain($statment->fetch()) : null;
    }

    protected function inflateDomains(StatementInterface $statment, array $values = []): ?array
    {
        if (empty($values)) {
            $queryBuilder = $this->getQueryBuilder();
            $statment->execute($queryBuilder->getValues());
        } else {
            $statment->execute($values);
        }

        if ($statment->rowCount()) {
            $result = $statment->fetchAll();
            return array_map([$this, 'instanciateDomain'], $result);
        }
        return null;
    }

    protected function prepareParams(array $params): array
    {
        unset($params[self::COL_ID], $params[self::COL_CREATED_AT], $params[self::COL_CREATED_AT]);
        return $params;
    }
}
