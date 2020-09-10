<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class DropVwEstatisticasRede extends AbstractMigration
{
    public function up(): void
    {
        $query = 'DROP VIEW vw_estatisticas_rede';
        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_estatisticas_rede] AS
            WITH estatisticas_cte ( id, anoExecucao, anoOrcamentario, data, gigovId, gigovNome, quantidade_operacoes, quantidade_notas_empenho, saldo_notas_empenho, dias_ate_bloqueio, dias_ate_cancelamento, created_at, updated_at) AS (
                SELECT
                    MIN(a.id) AS id,
                    f.anoExecucao,
                    f.anoOrcamentario,
                    CONVERT(DATE, a.dataReferencia) AS data,
                    e.gigovId,
                    e.gigovNome,
                    COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                    COUNT(a.id) AS quantidade_notas_empenho,
                    SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                    DATEDIFF(DAY, CONVERT(DATE, a.dataReferencia), f.dataBloqueio) AS dias_ate_bloqueio,
                    DATEDIFF(DAY, CONVERT(DATE, a.dataReferencia), f.dataCancelamento) AS dias_ate_cancelamento,
                    MAX(a.created_at) AS created_at,
                    MAX(a.updated_at) AS updated_at
                FROM dbo.saldos_notas_empenhos a
                JOIN dbo.pcasp AS b
                ON a.pcaspId = b.id
                JOIN dbo.ugs AS c
                ON a.ugId = c.id
                JOIN dbo.tipo_resultado_primario d
                ON a.tipoResultadoPrimarioId = d.id
                JOIN dbo.operacoes e
                ON a.operacaoId = e.id
                JOIN parametros f
                ON a.anoOrcamentario = f.anoOrcamentario
                AND b.id = f.rpNaoProcessadosALiquidarPcaspId
                AND c.id <> f.saudeUgId
                AND d.id <> f.orcamentoImpositivoTipoResultadoPrimarioId
                WHERE e.situacaoContrato = 'CONTRATADA'
                AND (
                    e.dataAIO IS NULL
                    OR (
                        e.situacaoContratoComplemento = 'SUSPENSIVA'
                        AND e.dataVRPL IS NULL
                    )
                )
                GROUP BY a.dataReferencia, f.anoExecucao, f.anoOrcamentario, e.gigovId, e.gigovNome, f.dataBloqueio, f.dataCancelamento
            ) 
                    
            SELECT
                a.*
            FROM estatisticas_cte a
            JOIN (
                SELECT
                    MAX(data) AS data
                FROM estatisticas_cte
                GROUP BY YEAR(DATA), MONTH(DATA)
            ) b
            ON a.data = b.data;
        SQL;

        $this->execute($query);
    }
}
