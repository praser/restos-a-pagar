<?php

use Phinx\Migration\AbstractMigration;

class SpDistribuicaoGestor extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE PROCEDURE SP_DISTRIBUICAO_GESTOR
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
                        c.siglaGestor AS siglaGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(DISTINCT a.documento) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        c.created_at,
                        c.created_at AS updated_at
                    FROM vw_saldos_notas_empenhos a
                    JOIN pcasp b
                    ON a.pcaspId = b.id
                    JOIN ugs c
                    ON a.ugId = c.id
                    JOIN tipo_resultado_primario d
                    ON a.tipoResultadoPrimarioId = d.id
                    JOIN operacoes e
                    ON a.operacaoId = e.id
                    JOIN parametros f
                    ON a.anoOrcamentario = f.anoOrcamentario
                    AND b.id = f.rpNaoProcessadosALiquidarPcaspId
                    AND c.id <> f.saudeUgId
                    AND a.tipoResultadoPrimarioId <> f.orcamentoImpositivoTipoResultadoPrimarioId
                    WHERE e.situacaoContrato = ''CONTRATADA'' 
                    AND f.anoExecucao = ' + CONVERT(NVARCHAR(4), @anoExecucao)
            
            IF (@tipoInformacaoId = 2)
            BEGIN
                SET @SQL = @SQL + ' AND e.dataCumprimentoCriteriosDesbloqueio IS NOT NULL '
            END
            
            IF (@tipoInformacaoId = 3)
            BEGIN
                SET @SQL = @SQL + ' AND e.dataCumprimentoCriteriosDesbloqueio IS NULL '
            END
            
            IF (@unidadeId IS NOT NULL)
            BEGIN
                SET @SQL = @SQL + ' AND e.gigovId = ' + CONVERT(NVARCHAR(4), @unidadeId)
            END
            
            IF(@siglaGestor IS NOT NULL)
            BEGIN
                SET @SQL = @SQL + ' AND c.siglaGestor = '''+ @siglaGestor +''''
            END
            
            SET @SQL = @SQL + ' GROUP BY c.siglaGestor, c.created_at 
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
            
            EXECUTE(@SQL)
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP PROCEDURE SP_DISTRIBUICAO_GESTOR');
    }
}
