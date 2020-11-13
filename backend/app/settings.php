<?php /** @noinspection StaticClosureCanBeUsedInspection */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

use DI\ContainerBuilder;
use Monolog\Logger;

const APP_ROOT = __DIR__ . '/../';
const DEFAULT_DB_DRIVER = 'sqlsrv';
const DEFAULT_DB_PORT = 1433;
const DEFAULT_DB_CHARSET = 'utf-8';

return function (ContainerBuilder $containerBuilder) {
    $suffix = getenv('ENV') === 'PRD' ? '' : '_' . getenv('ENV');
    // Global Settings Object
    $containerBuilder->addDefinitions([
        'settings' => [
            'displayErrorDetails' => getenv('ENV') === 'DES', // Should be set to false in production
            'uploadFolder' => __DIR__ . '/../' . getenv('UPLOAD_FOLDER'),
            'logger' => [
                'name' => 'api-restos-a-pagar',
                'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
                'level' => Logger::DEBUG,
            ],
            'jwt' => [
                'secret' => getenv('AUTH_SECRET')
            ],
            'connection' => [
                'driver' => getenv("DB_DRIVER{$suffix}") ?: DEFAULT_DB_DRIVER,
                'host' => getenv("DB_HOST{$suffix}"),
                'port' => getenv("DB_PORT{$suffix}") ?: DEFAULT_DB_PORT,
                'dbname' => getenv("DB_NAME{$suffix}"),
                'user' => getenv("DB_USER{$suffix}"),
                'password' => getenv("DB_PASSWORD{$suffix}"),
                'charset' => getenv("DB_CHARSET{$suffix}") ?: DEFAULT_DB_CHARSET
            ],
            'urls' => [
                'apiExpedientesGov' => getenv("URL_API_EXPEDIENTES_GOV"),
            ]
        ],
    ]);
};
