<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\EstatisticasPreBloqueioDomain;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;

class EstatisticasPreBloqueioDao extends DaoBase
{
    protected const TABLE = 'cache.estatisticas_pre_bloqueio';
    protected $domain = EstatisticasPreBloqueioDomain::class;

    public function findSumario(
        int $anoExecucao,
        int $tipoInformacaoId = 1,
        int $unidadeId = null,
        string $gestorSigla = null,
        DateTime $data = null
    ): ?array {
        try {
            [$queryBuilder, $query] = $this->getBaseQuery($tipoInformacaoId, $anoExecucao, $unidadeId, $gestorSigla);

            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    public function findSumarioPorGestor(
        int $anoExecucao,
        int $tipoInformacaoId = 1,
        int $unidadeId = null,
        string $gestorSigla = null,
        DateTime $data = null
    ): ?array {
        try {
            $cols = [EstatisticasPreBloqueioDomain::SIGLA_GESTOR, EstatisticasPreBloqueioDomain::NOME_GESTOR];
            [$queryBuilder, $query] = $this->getBaseQuery(
                $tipoInformacaoId,
                $anoExecucao,
                $unidadeId,
                $gestorSigla,
                null,
                $cols
            );

            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    public function findAllTipoInformacao(int $anoExecucao): array
    {
        $queryBuilder = $this->getQueryBuilder();
        $colunas = [
            EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_ID,
            EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_DESCRICAO
        ];

        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($colunas)
            ->setValueAsColumn(null, 'data')
            ->groupBy($colunas)
            ->where()
            ->equals(EstatisticasPreBloqueioDomain::ANO_EXECUCAO, $anoExecucao)
            ->end()
            ->orderBy(EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_ID, self::ASC);

        try {
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return [];
    }

    private function getBaseQuery(
        int $tipoInformacaoId,
        int $anoExecucao,
        int $unidadeId = null,
        string $gestorSigla = null,
        DateTime $data = null,
        array $columns = []
    ): array {
        $outputDateFormat = 'Y-m-d';
        $dt = is_null($data) ? new DateTime() : $data;
        $dataStr = $dt->format($outputDateFormat);

        $defaultColumns = [
            EstatisticasPreBloqueioDomain::ANO_EXECUCAO,
            EstatisticasPreBloqueioDomain::ANO_ORCAMENTARIO,
            EstatisticasPreBloqueioDomain::DATA,
            EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_ID,
            EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_DESCRICAO,
        ];
        $queryColumns = array_merge($defaultColumns, $columns);
        $queryBuilder = $this->getQueryBuilder();

        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($queryColumns)
            ->setFunctionAsColumn('MIN', [EstatisticasPreBloqueioDomain::ID], EstatisticasPreBloqueioDomain::ID)
            ->setFunctionAsColumn(
                'SUM',
                [EstatisticasPreBloqueioDomain::QUANTIDADE_OPERACOES],
                EstatisticasPreBloqueioDomain::QUANTIDADE_OPERACOES
            )
            ->setFunctionAsColumn(
                'SUM',
                [EstatisticasPreBloqueioDomain::QUANTIDADE_NOTAS_EMPENHO],
                EstatisticasPreBloqueioDomain::QUANTIDADE_NOTAS_EMPENHO
            )
            ->setFunctionAsColumn(
                'SUM',
                [EstatisticasPreBloqueioDomain::SALDO_NOTAS_EMPENHO],
                EstatisticasPreBloqueioDomain::SALDO_NOTAS_EMPENHO
            )
            ->setFunctionAsColumn(
                'MIN',
                [EstatisticasPreBloqueioDomain::CREATED_AT],
                EstatisticasPreBloqueioDomain::CREATED_AT
            )
            ->setFunctionAsColumn(
                'MAX',
                [EstatisticasPreBloqueioDomain::UPDATED_AT],
                EstatisticasPreBloqueioDomain::UPDATED_AT
            )
            ->groupBy($queryColumns)
            ->where()
            ->lessThanOrEqual(EstatisticasPreBloqueioDomain::DATA, $dataStr)
            ->equals(EstatisticasPreBloqueioDomain::TIPO_INFORMACAO_ID, $tipoInformacaoId)
            ->equals(EstatisticasPreBloqueioDomain::ANO_EXECUCAO, $anoExecucao)
            ->end()
            ->orderBy(EstatisticasPreBloqueioDomain::DATA, self::ASC);

        if ($unidadeId) {
            $query
                ->where()
                ->equals(EstatisticasPreBloqueioDomain::GIGOV_ID, $unidadeId)
                ->end();
        }

        if (!empty($gestorSigla)) {
            $query
                ->where()
                ->equals(EstatisticasPreBloqueioDomain::SIGLA_GESTOR, $gestorSigla)
                ->end();
        }
        return array($queryBuilder, $query);
    }

    public function findDistribuicaoPorGestor(
        int $anoExecucao,
        int $tipoInformacaoId,
        int $unidadeId = null,
        string $siglaGestor = null
    ): ?array {
        $query = 'exec SP_DISTRIBUICAO_PRE_BLOQUEIO_GESTOR :anoExecucao, :tipoInformacaoId, :unidadeId, :siglaGestor';
        $values = [
            ':anoExecucao' => $anoExecucao,
            ':tipoInformacaoId' => $tipoInformacaoId,
            ':unidadeId' => $unidadeId,
            ':siglaGestor' => $siglaGestor
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
