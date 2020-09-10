<?php

declare(strict_types=1);

use App\Application\ResponseEmitter\ResponseEmitter;
use Slim\Factory\AppFactory;
use Slim\Factory\ServerRequestCreatorFactory;

require __DIR__ . '/bootstrap.php';

// Instantiate the app
AppFactory::setContainer($container);
$app = AppFactory::create();
// $app->setBasePath(getenv('BASE_PATH'));
$callableResolver = $app->getCallableResolver();

// Register middleware
$middleware = require __DIR__ . '/../app/middleware.php';
$middleware($app);

// Register routes
$routes = require __DIR__ . '/../app/routes.php';
$routes($app);

try {
    /** @var bool $displayErrorDetails */
    $displayErrorDetails = $container->get('settings')['displayErrorDetails'];

    // Create Request object from globals
    $serverRequestCreator = ServerRequestCreatorFactory::create();
    $request = $serverRequestCreator->createServerRequestFromGlobals();

    // Add Routing Middleware
    $app->addRoutingMiddleware();
    $app->addBodyParsingMiddleware();

    // Run App & Emit Response
    $response = $app->handle($request);
    $responseEmitter = new ResponseEmitter();
    $responseEmitter->emit($response);
} catch(Exception $ex) {
    echo($ex->getMessage());
    die();
}