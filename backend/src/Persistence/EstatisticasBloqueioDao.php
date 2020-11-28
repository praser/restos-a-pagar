<?php
/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\EstatisticasBloqueioDomain;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;

class EstatisticasBloqueioDao extends DaoBase
{
    protected $domain = EstatisticasBloqueioDomain::class;

    public function findByAnoExecucao(int $anoExecucao, int $tipoInformacaoId = 1, int $unidadeId = null, string $gestorSigla = null): ?array
    {
        $query = 'SET NOCOUNT ON; EXEC SP_ESTATISTICAS_BLOQUEIO :anoExecucao, :tipoInformacaoId, :unidadeId, :siglaGestor';
        $values = [
            ':anoExecucao' => $anoExecucao,
            ':tipoInformacaoId' => $tipoInformacaoId,
            ':unidadeId' => $unidadeId,
            ':siglaGestor' => $gestorSigla
        ];

        try {
            $statment = $this->getConnection()->prepare($query);
            return $this->inflateDomains($statment, $values);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }

        return null;
    }
}
