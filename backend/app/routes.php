<?php
/** @noinspection StaticClosureCanBeUsedInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use App\Application\Controllers\EstatisticasController;
use App\Application\Controllers\OperacoesComEmpenhoPassivelBloqueioController;
use App\Application\Controllers\TipoInformacaoController;
use App\Application\Controllers\UgController;
use App\Application\Controllers\SaldoNotaEmpenhoController;
use App\Application\Controllers\UgGestoresController;
use App\Application\Controllers\UnidadesController;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app) {
    $app->group('/ug', function (Group $group) {
        $group->get('/gestores', UgGestoresController::class . ':index');
        $group->get('/{id}', UgController::class . ':show');
        $group->post('', UgController::class . ':create');
        $group->get('', UgController::class . ':index');
        $group->delete('/{id}', UgController::class . ':destroy');
        $group->put('/{id}', UgController::class . ':update');
        $group->get('/distintas/{anoExecucao}', UgController::class . ':distintas');
    });

    $app->group('/notas-empenho/saldo', function (Group $group) {
        $group->post('', SaldoNotaEmpenhoController::class . ':create');
    });

    $app->group('/operacoes/passiveis-bloqueio/{anoExecucao}', function (Group $group) {
        $group->get('/{tipoInformacaoId}', OperacoesComEmpenhoPassivelBloqueioController::class . ':index');
    });

    $app->group('/estatisticas/{anoExecucao}', function(Group $group) {
        $group->get('/{tipoInformacaoId}', EstatisticasController::class . ':index');
    });

    $app->group('/tipos-informacoes/{anoExecucao}', function(Group $group) {
        $group->get('', TipoInformacaoController::class . ':index');
    });

    $app->group('/unidades', function (Group $group) {
        $group->get('', UnidadesController::class . ':index');
    });

    $app->get('/', function(Request $req, Response $res, array $args): Response {
        $res->getBody()->write("API Restos a pagar");
        return $res;
    });
};
