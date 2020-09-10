<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$dotenv->required('ENV')->notEmpty()->allowedValues(['DES', 'TEST', 'PRD']);
$dotenv->required('BASE_PATH')->notEmpty();
$dotenv->required('DB_HOST')->notEmpty();
$dotenv->required('DB_NAME')->notEmpty();
$dotenv->required('DB_USER')->notEmpty();
$dotenv->required('DB_PASSWORD')->notEmpty();
$dotenv->required('AUTH_SECRET')->notEmpty();
$dotenv->required('UPLOAD_FOLDER')->notEmpty();
// Instantiate PHP-DI ContainerBuilder
$containerBuilder = new ContainerBuilder();
if (getenv('ENV') === 'PRD') {
// Should be set to true in production
    $containerBuilder->enableCompilation(__DIR__ . '/../var/cache');
}

// Set up settings
$settings = require __DIR__ . '/../app/settings.php';
$settings($containerBuilder);
// Set up dependencies
$dependencies = require __DIR__ . '/../app/dependencies.php';
$dependencies($containerBuilder);
// Build PHP-DI Container instance
try {
    $container = $containerBuilder->build();
} catch (Exception $ex) {
    echo($ex->getMessage());
    die();
}
