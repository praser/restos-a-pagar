<?php

declare(strict_types=1);

use App\Application\Controllers\EstatisticasPreBloqueioController;
use App\Application\Controllers\EstatisticasBloqueioController;
use App\Application\Controllers\EstatisticasBloqueioSnapshotController;
use App\Application\Controllers\OperacoesController;
use App\Application\Controllers\OperacoesComEmpenhoPassivelBloqueioController;
use App\Application\Controllers\OperacoesComEmpenhoBloqueadoController;
use App\Application\Controllers\TipoInformacaoController;
use App\Application\Controllers\UgController;
use App\Application\Controllers\SaldoNotaEmpenhoController;
use App\Application\Controllers\SaldoNotasEmpenhoAptasDesbloqueioController;
use App\Application\Controllers\SaldoNotaEmpenhoLiminarController;
use App\Application\Controllers\UgGestoresController;
use App\Application\Controllers\UnidadesController;
use App\Application\Controllers\ParametrosController;
use App\Application\Controllers\InfoController;
use App\Application\Controllers\LotesDesbloqueioController;
use App\Application\Controllers\LotesDesbloqueioLiminarController;
use App\Application\Controllers\LoteDesbloqueioOperacoesController;
use App\Application\Controllers\LiminaresController;
use App\Application\Controllers\LiminaresAtesteController;
use App\Application\Controllers\EmpenhosDesbloqueiosController;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app) {
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    $app->group('/ug', function (Group $group) {
        $group->get('/gestores', UgGestoresController::class . ':index');
        $group->get('/{id}', UgController::class . ':show');
        $group->post('', UgController::class . ':create');
        $group->get('', UgController::class . ':index');
        $group->delete('/{id}', UgController::class . ':destroy');
        $group->put('/{id}', UgController::class . ':update');
        $group->get('/distintas/{anoExecucao}', UgController::class . ':distintas');
    });

    $app->group('/notas-empenho', function (Group $group) {
        $group->post('/saldo', SaldoNotaEmpenhoController::class . ':create');
        $group->get(
            '/{anoOrcamentario}/aptas-desbloqueio',
            SaldoNotasEmpenhoAptasDesbloqueioController::class . ':index'
        );
        $group->get('/liminar/{id}', SaldoNotaEmpenhoLiminarController::class . ':index');
        $group->group('/lotes-desbloqueio', function (Group $subgroup) {
            $subgroup->post('', LotesDesbloqueioController::class . ':create');
            $subgroup->post('/liminar', LotesDesbloqueioLiminarController::class . ':create');
        });
    });

    $app->get('/operacoes', OperacoesController::class . ':index');

    $app->group('/operacoes/{anoExecucao}', function (Group $group) {
        $group->get('/passiveis-bloqueio', OperacoesComEmpenhoPassivelBloqueioController::class . ':index');
        $group->get('/bloqueio', OperacoesComEmpenhoBloqueadoController::class . ':index');
    });

    $app->group('/estatisticas/{anoExecucao}', function (Group $group) {
        $group->get('/passiveis-bloqueio', EstatisticasPreBloqueioController::class . ':index');
        $group->group('/bloqueio', function (Group $subgroup) {
            $subgroup->get('', EstatisticasBloqueioController::class . ':index');
            $subgroup->get('/snapshot', EstatisticasBloqueioSnapshotController::class . ':index');
        });
    });

    $app->group('/tipos-informacoes/{anoExecucao}', function (Group $group) {
        $group->get('', TipoInformacaoController::class . ':index');
    });

    $app->group('/unidades', function (Group $group) {
        $group->get('', UnidadesController::class . ':index');
    });

    $app->group('/parametros', function (Group $group) {
        $group->get('', ParametrosController::class . ':index');
        $group->get('/{anoOrcamentario}', ParametrosController::class . ':show');
    });


    $app->group('/liminares', function (Group $group) {
        $group->get('', LiminaresController::class . ':index');
        $group->post('', LiminaresController::class . ':create');
        $group->put('/{id}/check', LiminaresAtesteController::class . ':update');
    });

    $app->get('/info', InfoController::class . ':index');

    $app->group('/empenhos', function (Group $group) {
        $group->get('/{anoExecucao}', EmpenhosDesbloqueiosController::class . ':index');
    });

    $app->group('/lotes-desbloqueio/{anoExecucao}', function (Group $group) {
        $group->get('', LotesDesbloqueioController::class . ':index');
        $group->get('/{sequencial}', LoteDesbloqueioOperacoesController::class . ':index');
    });
};
