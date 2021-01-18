<?php

declare(strict_types=1);

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Psr\Container\ContainerInterface as Container;

class ExpedienteGovService
{
    private $client;

    public function __construct(Container $container)
    {
        $this->client = new Client(array(
            'base_uri' => $container->get('settings')['urls']['apiExpedientesGov'],
            'timeout' => 10
        ));
    }

    public function create(string $jwt, array $data): array
    {
        $headers = array(
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-Token' => $jwt,
        );

        $response = $this->client->request(
            'POST',
            'expedientes',
            array(
                'headers' => $headers,
                'body' => json_encode($data, JSON_THROW_ON_ERROR, 512)
            ),
        );

        $body = json_decode((string) $response->getBody(), true);

        return $body;
    }
}
