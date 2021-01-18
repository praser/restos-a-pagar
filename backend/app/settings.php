<?php

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
                'apiExpedientesGov' => getenv('URL_API_EXPEDIENTES_GOV'),
            ],
            'smtp' => [
                'debug' => getenv('SMPT_DEBUG'),
                'host' => getenv('SMTP_HOST'),
                'port' => getenv('SMTP_PORT'),
                'fromEmail' => getenv('SMTP_FROM_EMAIL'),
                'fromName' => getenv('SMTP_FROM_NAME'),
            ],
            'managers' => [
                'gerenciaNacionalOperacao' => getenv('GERENCIA_NACIONAL_OPERACAO'),
                'gerenciaNacionalOperacaoEmail' => getEnv('GERENCIA_NACIONAL_OPERACAO_EMAIL'),
                'gerenteNacionalOperacao' => getenv('GERENTE_NACIONAL_OPERACAO'),
                'gerenciaExecutivaOperacao' => getenv('GERENCIA_EXECUTIVA_OPERACAO'),
                'gerenciaExecutivaOperacaoEmail' => getEnv('GERENCIA_EXECUTIVA_OPERACAO_EMAIL'),
                'gerenteExecutivoOperacao' => getenv('GERENTE_EXECUTIVO_OPERACAO'),
                'gerenciaExecutivaFinanceira' => getenv('GERENCIA_EXECUTIVA_FINANCEIRA'),
                'gerenciaExecutivaFinanceiraEmail' => getEnv('GERENCIA_EXECUTIVA_FINANCEIRA_EMAIL'),
            ],
            'templates' => __DIR__ . '/../src/Views/Mail',
            'cache' => __DIR__ . '/../var/cache/templates',
        ],
    ]);
};
