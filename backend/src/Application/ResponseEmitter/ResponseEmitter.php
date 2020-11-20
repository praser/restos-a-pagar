<?php

declare(strict_types=1);

namespace App\Application\ResponseEmitter;

use Psr\Http\Message\ResponseInterface;
use Slim\ResponseEmitter as SlimResponseEmitter;

class ResponseEmitter extends SlimResponseEmitter
{
    /**
     * {@inheritdoc}
     */
    public function emit(ResponseInterface $response): void
    {
        // $res = $response
        //     ->withHeader('Access-Control-Allow-Origin', '*')
        //     ->withHeader('Access-Control-Allow-Credentials', 'true')
        //     ->withHeader(
        //         'Access-Control-Allow-Headers',
        //         'X-Token, X-Requested-With, Content-Type, Accept, Origin'
        //     )
        //     ->withHeader('Content-Type', 'application/json')
        //     ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        //     ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        //     ->withAddedHeader('Cache-Control', 'post-check=0, pre-check=0')
        //     ->withHeader('Pragma', 'no-cache');
        $res = $response
            ->withHeader('Content-Type', 'application/json');

        if (ob_get_contents()) {
            ob_clean();
        }

        parent::emit($res);
    }
}
