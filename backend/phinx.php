<?php

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/src/Infrastructure/Database/Migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/src/Infrastructure/Database/Seeds'
    ],
    'environments' => [
        'default_migration_table' => '_phinxlog',
        'default_database' => 'development',
        'production' => [
            'adapter' => env('DB_DRIVER') ?: 'sqlsrv',
            'host' => env('DB_HOST'),
            'name' => env('DB_NAME'),
            'user' => env('DB_USER'),
            'pass' => env('DB_PASSWORD'),
            'port' => env('DB_PORT') ?: 1433,
        ],
        'development' => [
            'adapter' => env('DB_DRIVER_DES') ?: 'sqlsrv',
            'host' => env('DB_HOST_DES'),
            'name' => env('DB_NAME_DES'),
            'user' => env('DB_USER_DES'),
            'pass' => env('DB_PASSWORD_DES'),
            'port' => env('DB_PORT_DES') ?: 1433,
        ],
        'test' => [
            'adapter' => env('DB_DRIVER_TEST') ?: 'sqlsrv',
            'host' => env('DB_HOST_TEST'),
            'name' => env('DB_NAME_TEST'),
            'user' => env('DB_USER_TEST'),
            'pass' => env('DB_PASSWORD_TEST'),
            'port' => env('DB_PORT_TEST') ?: 1433,
        ]
    ],
    'version_order' => 'creation'
];
