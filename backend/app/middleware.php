<?php
/** @noinspection PhpUnused */
/** @noinspection StaticClosureCanBeUsedInspection */
declare(strict_types=1);

use Tuupola\Middleware\JwtAuthentication;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();
    
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Token, X-Requested-With, Content-Type, Accept, Origin')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->add(new JwtAuthentication([
        'regexp' => '/(.*)/',
        'header' => 'X-Token',
        'ignore' => ['/info'],
        'path' => '/',
        'realm' => 'Protected',
        'secure' => false,
        'secret' => $container ? $container->get('settings')['jwt']['secret'] : null,
        'error' => function ($response, $arguments) {
            $data["status"] = "error";
            $data["message"] = $arguments["message"];
            return $response
                ->withHeader("Content-Type", "application/json")
                ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }

    ]));

    $app->addErrorMiddleware(true, true, true);
};
