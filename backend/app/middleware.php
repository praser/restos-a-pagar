<?php

declare(strict_types=1);

use Tuupola\Middleware\JwtAuthentication;
use Slim\App;
use Psr\Log\LoggerInterface;
use Firebase\JWT\JWT;

function joinPaths(string $basePath, string $path): string
{
    $sep = '/';
    return join($sep, array(trim($basePath, $sep), trim($path, $sep)));
}

return function (App $app) {
    $container = $app->getContainer();
    $logger = $container->get(LoggerInterface::class);
    $basePath = $container->get('settings')['basePath'];
    $authlessPaths = array_map(function ($path) use ($basePath) {
        return joinPaths($basePath, $path);
    }, ['/info', '/parametros', '/lotes-desbloqueio/download']);

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
        'ignore' => $authlessPaths,
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

    $app->add(function ($request, $handler) use ($container, $authlessPaths) {
        $path = $request->getUri()->getPath();

        if (!in_array($path, $authlessPaths)) {
            $jwt = $request->getHeader('X-Token')[0];
            $secret = $container->get('settings')['jwt']['secret'];
            $decoded = JWT::decode($jwt, $secret, array('HS256'));

            $attributes = array(
                'attributes' => json_encode($decoded->user),
                'token' => $jwt
            );

            return $handler->handle($request->withAttribute('user', $attributes));
        }
        return $handler->handle($request);
    });

    $app->addErrorMiddleware(true, true, true);
};
