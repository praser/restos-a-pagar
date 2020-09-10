<?php
/** @noinspection PhpUnused */
/** @noinspection StaticClosureCanBeUsedInspection */
declare(strict_types=1);

use Tuupola\Middleware\JwtAuthentication;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();
    $app->add(new JwtAuthentication([
        'regexp' => '/(.*)/',
        'header' => 'X-Token',
        'path' => '/',
        'realm' => 'Protected',
        'secure' => false,
        'secret' => $container ? $container->get('settings')['jwt']['secret'] : null,
        "error" => function ($response, $arguments) {
            $data["status"] = "error";
            $data["message"] = $arguments["message"];
            return $response
                ->withHeader("Content-Type", "application/json")
                ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    ]));
    $app->addErrorMiddleware(true, true, true);
};
