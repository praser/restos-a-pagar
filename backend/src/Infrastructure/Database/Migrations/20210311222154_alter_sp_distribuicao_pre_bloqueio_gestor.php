<?php

use Phinx\Migration\AbstractMigration;

class AlterSpDistribuicaoPreBloqueioGestor extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER PROCEDURE [dbo].[SP_DISTRIBUICAO_PRE_BLOQUEIO_GESTOR]
            @anoExecucao AS INT,
            @tipoInformacaoId AS INT,
            @unidadeId AS INT,
            @siglaGestor AS NVARCHAR(10)
            AS
            DECLARE @SQL AS VARCHAR(MAX)
            SET @SQL = 'WITH cte(
                id
                ,siglaGestor
                ,quantidade_operacoes
                ,quantidade_notas_empenho
                ,saldo_notas_empenho
                ,created_at
                ,updated_at
            ) AS (
                SELECT
                    a.id
                    ,a.siglaGestor
                    ,a.quantidade_operacoes
                    ,a.quantidade_notas_empenho
                    ,a.saldo_notas_empenho
                    ,a.created_at
                    ,a.updated_at
                FROM cache.estatisticas_pre_bloqueio a
                JOIN dbo.parametros AS b
                ON b.anoExecucao = ' + CONVERT(NVARCHAR(4), @anoExecucao) + '
                WHERE 1 = 1
                AND tipoInformacaoId = ' + CONVERT(NVARCHAR(4), @tipoInformacaoId) + '
                AND a.data = (
                    SELECT TOP 1
                        data
                    FROM cache.estatisticas_pre_bloqueio
                    WHERE data < b.dataBloqueio
                    ORDER BY data DESC
                )'
                IF (@unidadeId IS NOT NULL)
                BEGIN
                    SET @SQL = @SQL + ' AND a.gigovId = ' + CONVERT(NVARCHAR(4), @unidadeId)
                END
                IF(@siglaGestor IS NOT NULL)
                BEGIN
                    SET @SQL = @SQL + ' AND a.siglaGestor = '''+ @siglaGestor +''''
                END
                SET @SQL = @SQL + '
            )
            SELECT
                MAX(a.id) AS id
                ,a.siglaGestor
                ,null AS data
                ,SUM(quantidade_operacoes) AS quantidade_operacoes
                ,SUM(quantidade_notas_empenho) AS quantidade_notas_empenho
                ,SUM(saldo_notas_empenho) AS saldo_notas_empenho
                ,MAX(created_at) AS created_at
                ,MAX(updated_at) AS updated_at
            FROM '
            IF (@siglaGestor IS NULL)
            BEGIN
                SET @SQL = @SQL + '(
                    SELECT
                        IIF(b.siglaGestor IS NULL, 0, a.id) AS id
                        ,IIF(b.siglaGestor IS NULL, ''OUTROS'', a.siglaGestor) AS siglaGestor
                        ,quantidade_operacoes
                        ,quantidade_notas_empenho
                        ,a.saldo_notas_empenho
                        ,created_at
                        ,updated_at
                    FROM cte a
                    LEFT JOIN (
                        SELECT TOP 5
                            siglaGestor
                            ,SUM(saldo_notas_empenho) AS saldos_notas_empenhos
                        FROM cte
                        GROUP BY siglaGestor
                        ORDER BY saldos_notas_empenhos DESC
                    ) b
                    ON a.siglaGestor = b.siglaGestor
                ) AS a '
            END
            IF (@siglaGestor IS NOT NULL)
            BEGIN
                SET @SQL = @SQL + 'cte AS a '
            END
            SET @SQL = @SQL + ' GROUP BY a.siglaGestor;'
            EXECUTE(@SQL);
        SQL;
        $this->execute($query);
    }
    public function down(): void
    {
        $query = <<<SQL
            ALTER PROCEDURE [dbo].[SP_DISTRIBUICAO_PRE_BLOQUEIO_GESTOR]
            @anoExecucao AS INT,
            @tipoInformacaoId AS INT,
            @unidadeId AS INT,
            @siglaGestor AS NVARCHAR(10)
            AS
            DECLARE @SQL AS VARCHAR(MAX)
            SET @SQL = 'WITH cte(
                id,
                siglaGestor,
                quantidade_operacoes,
                quantidade_notas_empenho,
                saldo_notas_empenho,
                created_at,
                updated_at
            ) AS (
                SELECT
                    ROW_NUMBER() OVER(ORDER BY saldo_notas_empenho DESC) AS id,
                    a.*
                FROM (
                    SELECT
                        d.sigla AS siglaGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(DISTINCT a.documento) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        c.created_at,
                        c.created_at AS updated_at
                    FROM cache.saldos_notas_empenhos AS a
                    JOIN pcasp AS b
                    ON a.pcaspId = b.id
                    JOIN ugs AS c
                    ON a.ugId = c.id
                    JOIN dbo.ministerios AS d
                    ON c.ministerioId = d.id
                    JOIN tipo_resultado_primario AS e
                    ON a.tipoResultadoPrimarioId = e.id
                    JOIN operacoes AS f
                    ON a.operacaoId = f.id
                    JOIN parametros AS g
                    ON a.anoOrcamentario = g.anoOrcamentario
                    AND b.classe = g.pcaspClasse
                    AND b.grupo = g.pcaspGrupo
                    AND b.subgrupo = g.pcaspSubgrupo
                    AND b.titulo = g.pcaspTituloPreBloqueio
                    AND c.id NOT IN (
                        SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = g.id
                    )
                    AND a.tipoResultadoPrimarioId NOT IN (
                        SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = g.id
                    )
                    WHERE f.situacaoContrato = ''CONTRATADA''
                    AND g.anoExecucao = ' + CONVERT(NVARCHAR(4), @anoExecucao)
            IF (@tipoInformacaoId = 2)
            BEGIN
                SET @SQL = @SQL + ' AND f.dataCumprimentoCriteriosDesbloqueio IS NOT NULL '
            END
            IF (@tipoInformacaoId = 3)
            BEGIN
                SET @SQL = @SQL + ' AND f.dataCumprimentoCriteriosDesbloqueio IS NULL '
            END
            IF (@unidadeId IS NOT NULL)
            BEGIN
                SET @SQL = @SQL + ' AND f.gigovId = ' + CONVERT(NVARCHAR(4), @unidadeId)
            END
            IF(@siglaGestor IS NOT NULL)
            BEGIN
                SET @SQL = @SQL + ' AND d.sigla = '''+ @siglaGestor +''''
            END
            SET @SQL = @SQL + ' GROUP BY d.sigla, c.created_at
                ) a
            )
            SELECT
                a.id,
                a.siglaGestor,
                null AS data,
                SUM(quantidade_operacoes) AS quantidade_operacoes,
                SUM(quantidade_notas_empenho) AS quantidade_notas_empenho,
                SUM(saldo_notas_empenho) AS saldo_notas_empenho,
                MAX(created_at) AS created_at,
                MAX(updated_at) AS updated_at
            FROM (
                SELECT
                    IIF(b.saldo_notas_empenho IS NULL, 0, a.id) AS id,
                    IIF(b.saldo_notas_empenho IS NULL, ''OUTROS'', a.siglaGestor) AS siglaGestor,
                    quantidade_operacoes,
                    quantidade_notas_empenho,
                    a.saldo_notas_empenho,
                    created_at,
                    updated_at
                FROM cte a
                LEFT JOIN (
                    SELECT TOP 5
                        saldo_notas_empenho
                    FROM cte
                    ORDER BY 1 DESC
                ) b
                ON a.saldo_notas_empenho = b.saldo_notas_empenho
            ) a
            GROUP BY a.id, a.siglaGestor;'
            EXECUTE(@SQL);
        SQL;
        
        $this->execute($query);
    }
}
