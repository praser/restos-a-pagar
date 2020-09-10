<?php
/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\DomainInterface;
use App\Domain\EstatisticasDomain;
use DateTime;
use Exception;
use NilPortugues\Sql\QueryBuilder\Syntax\OrderBy;

class EstatisticasDao extends DaoBase
{
    protected const TABLE = 'cache.estatisticas';
    protected $domain = EstatisticasDomain::class;

    public function findSumario(int $anoExecucao, int $tipoInformacaoId = 1, int $unidadeId = null, string $gestorSigla = null, DateTime $data = null): ?array
    {
        try {
            [$queryBuilder, $query] = $this->getBaseQuery($tipoInformacaoId, $anoExecucao, $unidadeId, $gestorSigla);

            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    public function findSumarioPorGestor(int $anoExecucao, int $tipoInformacaoId = 1, int $unidadeId = null, string $gestorSigla = null, DateTime $data = null): ?array
    {
        try {
            $cols = [EstatisticasDomain::SIGLA_GESTOR, EstatisticasDomain::NOME_GESTOR];
            [$queryBuilder, $query] = $this->getBaseQuery($tipoInformacaoId, $anoExecucao, $unidadeId, $gestorSigla, null, $cols);

            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
        return null;
    }

    public function findAllTipoInformacao(int $anoExecucao): ?array
    {
        $queryBuilder = $this->getQueryBuilder();
        $colunas = [EstatisticasDomain::TIPO_INFORMACAO_ID, EstatisticasDomain::TIPO_INFORMACAO_DESCRICAO];

        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($colunas)
            ->setValueAsColumn(null, 'data')
            ->groupBy($colunas)
            ->where()
            ->equals(EstatisticasDomain::ANO_EXECUCAO, $anoExecucao)
            ->end()
            ->orderBy(EstatisticasDomain::TIPO_INFORMACAO_ID, self::ASC);

        try {
            $statment = $this->getConnection()->prepare($queryBuilder->write($query));
            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }
    }

    private function getBaseQuery(int $tipoInformacaoId, int $anoExecucao, int $unidadeId = null, string $gestorSigla = null, DateTime $data = null, array $columns = []): array
    {
        $outputDateFormat = 'Y-m-d';
        $dt = is_null($data) ? new DateTime() : $data;
        $dataStr = $dt->format($outputDateFormat);

        $defaultColumns = [
            EstatisticasDomain::ANO_EXECUCAO,
            EstatisticasDomain::ANO_ORCAMENTARIO,
            EstatisticasDomain::DATA,
            EstatisticasDomain::TIPO_INFORMACAO_ID,
            EstatisticasDomain::TIPO_INFORMACAO_DESCRICAO,
        ];
        $queryColumns = array_merge($defaultColumns, $columns);
        $queryBuilder = $this->getQueryBuilder();

        $query = $queryBuilder
            ->select()
            ->setTable(self::TABLE)
            ->setColumns($queryColumns)
            ->setFunctionAsColumn('MIN', [EstatisticasDomain::ID], EstatisticasDomain::ID)
            ->setFunctionAsColumn('SUM', [EstatisticasDomain::QUANTIDADE_OPERACOES], EstatisticasDomain::QUANTIDADE_OPERACOES)
            ->setFunctionAsColumn('SUM', [EstatisticasDomain::QUANTIDADE_NOTAS_EMPENHO], EstatisticasDomain::QUANTIDADE_NOTAS_EMPENHO)
            ->setFunctionAsColumn('SUM', [EstatisticasDomain::SALDO_NOTAS_EMPENHO], EstatisticasDomain::SALDO_NOTAS_EMPENHO)
            ->setFunctionAsColumn('MIN', [EstatisticasDomain::CREATED_AT], EstatisticasDomain::CREATED_AT)
            ->setFunctionAsColumn('MAX', [EstatisticasDomain::UPDATED_AT], EstatisticasDomain::UPDATED_AT)
            ->groupBy($queryColumns)
            ->where()
            ->lessThanOrEqual(EstatisticasDomain::DATA, $dataStr)
            ->equals(EstatisticasDomain::TIPO_INFORMACAO_ID, $tipoInformacaoId)
            ->equals(EstatisticasDomain::ANO_EXECUCAO, $anoExecucao)
            ->end()
            ->orderBy(EstatisticasDomain::DATA, self::ASC);

        if ($unidadeId) {
            $query
                ->where()
                ->equals(EstatisticasDomain::GIGOV_ID, $unidadeId)
                ->end();
        }

        if (!empty($gestorSigla)) {
            $query
                ->where()
                ->equals(EstatisticasDomain::SIGLA_GESTOR, $gestorSigla)
                ->end();
        }
        return array($queryBuilder, $query);
    }

    public function findDistribuicaoPorGestor(int $anoExecucao, int $tipoInformacaoId, int $unidadeId = null, string $siglaGestor = null): ?array
    {
        $query = 'exec SP_DISTRIBUICAO_GESTOR :anoExecucao, :tipoInformacaoId, :unidadeId, :siglaGestor';
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
