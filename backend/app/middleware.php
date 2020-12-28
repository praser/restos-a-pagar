<?php

declare(strict_types=1);

use Tuupola\Middleware\JwtAuthentication;
use Slim\App;
use Psr\Log\LoggerInterface;
use Firebase\JWT\JWT;

return function (App $app) {
    $container = $app->getContainer();
    $logger = $container->get(LoggerInterface::class);
    
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
        },
    ]));

    $app->add(function ($request, $handler) use ($container) {
        $jwt = $request->getHeader('X-Token')[0];
        $secret = $container->get('settings')['jwt']['secret'];
        $decoded = JWT::decode($jwt, $secret, array('HS256'));

        $attributes = array(
            'attributes' => json_encode($decoded->user),
            'token' => $jwt
        );
        
        $req = $request->withAttribute('user', $attributes);
        return $handler->handle($req);
    });

    $app->addErrorMiddleware(true, true, true, $logger);
};
