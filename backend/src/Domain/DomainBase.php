<?php /** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Domain;

use App\Infrastructure\Validator\Validator;
use DateTime;

abstract class DomainBase implements DomainInterface
{
    public const DATE_Y_M_D_H_I_S = 'Y-m-d H:i:s.v';
    public const DATE_Y_M_D = 'Y-m-d';
    public const ID = 'id';
    public const CREATED_AT = 'created_at';
    public const UPDATED_AT = 'updated_at';

    protected $id;
    protected $created_at;
    protected $updated_at;
    protected $validator;

    public function __construct(array $params = [])
    {
        $params = $this->parseParams($params);
        $createdAt = $this->parseDateTime((string) $params[self::CREATED_AT]);
        $updatedAt = $this->parseDateTime((string) $params[self::UPDATED_AT]);

        $this->setId((int)$this->setAttribute(self::ID, $params));
        $this->setCreatedAt($createdAt);
        $this->setUpdatedAt($updatedAt);
        $this->validator = new Validator();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(DateTime $createdAt = null): void
    {
        $this->created_at = $createdAt;
    }

    public function getUpdatedAt(): ?DateTime
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(DateTime $updatedAt = null): void
    {
        $this->updated_at = $updatedAt;
    }

    public function jsonSerialize()
    {
        return [
            self::ID => $this->getId(),
            self::CREATED_AT => $this->dateTimeToString($this->getCreatedAt()),
            self::UPDATED_AT => $this->dateTimeToString($this->getUpdatedAt()),
        ];
    }

    protected function dateTimeToString(?DateTime $dateTime): ?string
    {
        return $dateTime ? $dateTime->format(self::DATE_Y_M_D_H_I_S) : null;
    }

    public function isValid(): bool {
        return true;
    }

    final public function getErrors(): array
    {
        return $this->validator->getErrors();
    }

    protected function setAttribute(string $key, array $params)
    {
        return $params[$key] ?? null;
    }

    protected function parseDateTime(?string $dateTime, string $format = self::DATE_Y_M_D_H_I_S): ?DateTime
    {
        if ($dateTime !== null) {
            $date = DateTime::createFromFormat($format, $dateTime);
            return ($date && DateTime::getLastErrors()['warning_count'] === 0 ? $date : null);
        }

        return null;
    }

    protected function parseParams(array $params): array
    {
        return [
            self::ID => $this->setAttribute(self::ID, $params),
            self::CREATED_AT => $this->setAttribute(self::CREATED_AT, $params),
            self::UPDATED_AT => $this->setAttribute(self::UPDATED_AT, $params),
        ];
    }
}
