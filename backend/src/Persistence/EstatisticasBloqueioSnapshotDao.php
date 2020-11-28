<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\EstatisticasBloqueioDomain;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;

class EstatisticasBloqueioSnapshotDao extends DaoBase
{
  protected const TABLE = 'snapshot_estatisticas_bloqueio';
  protected $domain = EstatisticasBloqueioDomain::class;

    public function findByAnoExecucao(int $anoExecucao, int $tipoInformacaoId = 1, int $unidadeId = null, string $gestorSigla = null, DateTime $data = null): ?array
    {
        try {
            [$queryBuilder, $query ] = $this->getBaseQuery($tipoInformacaoId, $anoExecucao, $unidadeId, $gestorSigla, $data);

            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch(Exception $ex) {
            $this->exceptionHandler($ex);
        }
    }

    private function getBaseQuery(int $tipoInformacaoId, int $anoExecucao, int $unidadeId = null, string $gestorSigla = null, DateTime $data = null, array $columns = []): array
    {
        $outputDateFormat = 'Y-m-d';
        $dt = is_null($data) ? new DateTime() : $data;
        $dataStr = $dt->format($outputDateFormat);

        $defaultColumns = [
            EstatisticasBloqueioDomain::ANO_EXECUCAO,
            EstatisticasBloqueioDomain::ANO_ORCAMENTARIO,
            EstatisticasBloqueioDomain::DATA,
            EstatisticasBloqueioDomain::TIPO_INFORMACAO_ID,
            EstatisticasBloqueioDomain::TIPO_INFORMACAO_DESCRICAO,
        ];
        $queryColumns = array_merge($defaultColumns, $columns);
        $queryBuilder = $this->getQueryBuilder();

        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($queryColumns)
            ->setFunctionAsColumn('SUM', [EstatisticasBloqueioDomain::QUANTIDADE_OPERACOES], EstatisticasBloqueioDomain::QUANTIDADE_OPERACOES)
            ->setFunctionAsColumn('SUM', [EstatisticasBloqueioDomain::QUANTIDADE_DOCUMENTOS], EstatisticasBloqueioDomain::QUANTIDADE_DOCUMENTOS)
            ->setFunctionAsColumn('SUM', [EstatisticasBloqueioDomain::SALDO_BLOQUEADO], EstatisticasBloqueioDomain::SALDO_BLOQUEADO)
            ->setFunctionAsColumn('SUM', [EstatisticasBloqueioDomain::SALDO_DESBLOQUEADO], EstatisticasBloqueioDomain::SALDO_DESBLOQUEADO)
            ->setFunctionAsColumn('SUM', [EstatisticasBloqueioDomain::SALDO_AGUARDANDO_DESBLOQUEIO], EstatisticasBloqueioDomain::SALDO_AGUARDANDO_DESBLOQUEIO)
            ->groupBy($queryColumns)
            ->where()
            ->lessThanOrEqual(EstatisticasBloqueioDomain::DATA, $dataStr)
            ->equals(EstatisticasBloqueioDomain::TIPO_INFORMACAO_ID, $tipoInformacaoId)
            ->equals(EstatisticasBloqueioDomain::ANO_EXECUCAO, $anoExecucao)
            ->end()
            ->orderBy(EstatisticasBloqueioDomain::DATA, self::ASC);

        if ($unidadeId) {
            $query
                ->where()
                ->equals(EstatisticasBloqueioDomain::GIGOV_ID, $unidadeId)
                ->end();
        }

        if (!empty($gestorSigla)) {
            $query
                ->where()
                ->equals(EstatisticasBloqueioDomain::SIGLA_GESTOR, $gestorSigla)
                ->end();
        }
        return array($queryBuilder, $query);
    }
}