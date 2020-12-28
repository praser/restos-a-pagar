<?php

declare(strict_types=1);

namespace App\Application\Controllers;

use App\Domain\ControleArquivoDomain;
use App\Persistence\ControleArquivoDao;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use RuntimeException;

class SaldoNotaEmpenhoController extends ControllerBase
{
    public function create(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody();
        $uploadFolder = $this->container->get('settings')['uploadFolder'] . '/./saldos-notas-empenhos/';
        $csvFilePath = $uploadFolder . $params[ControleArquivoDomain::UUID] . '.job';
        $delimiter = ';';
        $controleArquivo = new ControleArquivoDomain($params);
        $controleArquivo->setArquivo($csvFilePath);
        $dao = new ControleArquivoDao($this->container);
        $dao->create($controleArquivo);

        if (!file_exists($uploadFolder) && !mkdir($uploadFolder, 777, true) && !is_dir($uploadFolder)) {
            throw new RuntimeException(sprintf('Directory "%s" was not created', $uploadFolder));
        }

        $file = fopen($csvFilePath, 'wb');
        fputcsv($file, array_keys($params['saldos'][0]), $delimiter);
        foreach ($params['saldos'] as $param) {
            fwrite($file, implode($delimiter, $param) . PHP_EOL);
        }
        fclose($file);

        return $res->withStatus(self::HTTP_CREATED);
    }
}