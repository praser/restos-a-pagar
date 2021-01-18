<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class CreateNewVwEstatisticas extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_estatisticas AS
            WITH estatisticas_cte (
                id,
                anoExecucao,
                anoOrcamentario,
                data,
                gigovId,
                gigovNome,
                siglaGestor,
                nomeGestor,
                quantidade_operacoes,
                quantidade_notas_empenho,
                saldo_notas_empenho,
                quantidade_operacoes_cumpriram_criterios,
                quantidade_notas_empenho_cumpriram_criterios,
                saldo_notas_empenho_cumpriram_criterios,
                quantidade_operacoes_nao_cumpriram_criterios,
                quantidade_notas_empenho_nao_cumpriram_criterios,
                saldo_notas_empenho_nao_cumpriram_criterios,
                created_at,
                updated_at
            ) AS (
                SELECT
                    MIN(a.id) AS id,
                    a.anoExecucao,
                    a.anoOrcamentario,
                    a.data,
                    a.gigovId,
                    a.gigovNome,
                    a.siglaGestor,
                    a.nomeGestor,
                    SUM(a.quantidade_operacoes) AS quantidade_operacoes,
                    SUM(a.quantidade_notas_empenho) AS quantidade_notas_empenho,
                    SUM(a.saldo_notas_empenho) AS saldo_notas_empenho,
                    SUM(a.quantidade_operacoes_cumpriram_criterios) AS quantidade_operacoes_cumpriram_criterios,
                    SUM(a.quantidade_notas_empenho_cumpriram_criterios) AS quantidade_notas_empenho_cumpriram_criterios,
                    SUM(a.saldo_notas_empenho_cumpriram_criterios) AS saldo_notas_empenho_cumpriram_criterios,
                    SUM(a.quantidade_operacoes - a.quantidade_operacoes_cumpriram_criterios) AS quantidade_operacoes_nao_cumpriram_criterios,
                    SUM(a.quantidade_notas_empenho - a.quantidade_notas_empenho_cumpriram_criterios) AS quantidade_notas_empenho_nao_cumpriram_criterios,
                    SUM(a.saldo_notas_empenho - a.saldo_notas_empenho_cumpriram_criterios) AS saldo_notas_empenho_nao_cumpriram_criterios,
                    a.created_at,
                    a.updated_at
                FROM (
                    SELECT
                        MIN(a.id) AS id,
                        f.anoExecucao,
                        f.anoOrcamentario,
                        CONVERT(DATE, a.dataReferencia) AS data,
                        e.gigovId,
                        e.gigovNome,
                        c.siglaGestor,
                        c.nomeGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(a.id) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        CASE
                        WHEN e.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(DISTINCT a.operacaoId)
                        ELSE 0
                        END AS quantidade_operacoes_cumpriram_criterios,
                        CASE
                        WHEN e.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(a.operacaoId)
                        ELSE 0
                        END AS quantidade_notas_empenho_cumpriram_criterios,
                        CASE
                        WHEN e.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN SUM(a.saldoContaContabil)
                        ELSE 0
                        END AS saldo_notas_empenho_cumpriram_criterios,
                        MAX(a.created_at) AS created_at,
                        MAX(a.updated_at) AS updated_at
                    FROM saldos_notas_empenhos a
                    JOIN pcasp AS b
                    ON a.pcaspId = b.id
                    JOIN ugs AS c
                    ON a.ugId = c.id
                    JOIN tipo_resultado_primario d
                    ON a.tipoResultadoPrimarioId = d.id
                    JOIN operacoes e
                    ON a.operacaoId = e.id
                    JOIN parametros f
                    ON a.anoOrcamentario = f.anoOrcamentario
                    AND b.id = f.rpNaoProcessadosALiquidarPcaspId
                    AND c.id <> f.saudeUgId
                    AND d.id <> f.orcamentoImpositivoTipoResultadoPrimarioId
                    WHERE e.situacaoContrato = 'CONTRATADA'
                    GROUP BY a.dataReferencia, f.anoExecucao, f.anoOrcamentario, e.gigovId, e.gigovNome, c.siglaGestor, c.nomeGestor, e.dataCumprimentoCriteriosDesbloqueio
                ) a
                GROUP BY
                    a.anoExecucao,
                    a.anoOrcamentario,
                    a.data,
                    a.gigovId,
                    a.gigovNome,
                    a.siglaGestor,
                    a.nomeGestor,
                    a.created_at,
                    a.updated_at
            )
                                            
            SELECT
                a.id,
                a.anoExecucao,
                a.anoOrcamentario,
                a.data,
                a.gigovId,
                a.gigovNome,
                a.siglaGestor,
                a.nomeGestor,
                a.quantidade_operacoes,
                a.quantidade_notas_empenho,
                a.saldo_notas_empenho,
                1 AS tipoInformacaoId,
                'Todas as operações' AS tipoInformacaoDescricao,
                a.created_at,
                a.updated_at
            FROM estatisticas_cte a
            JOIN (
                SELECT
                    MAX(data) AS data
                FROM estatisticas_cte
                GROUP BY YEAR(DATA), MONTH(DATA)
            ) b
            ON a.data = b.data
            
            UNION ALL
            
            SELECT
                a.id,
                a.anoExecucao,
                a.anoOrcamentario,
                a.data,
                a.gigovId,
                a.gigovNome,
                a.siglaGestor,
                a.nomeGestor,
                a.quantidade_operacoes_cumpriram_criterios,
                a.quantidade_notas_empenho_cumpriram_criterios,
                a.saldo_notas_empenho_cumpriram_criterios,
                2 AS tipoInformacaoId,
                'Operações que já cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao,
                a.created_at,
                a.updated_at
            FROM estatisticas_cte a
            JOIN (
                SELECT
                    MAX(data) AS data
                FROM estatisticas_cte
                GROUP BY YEAR(DATA), MONTH(DATA)
            ) b
            ON a.data = b.data
            
            UNION ALL
            
            SELECT
                a.id,
                a.anoExecucao,
                a.anoOrcamentario,
                a.data,
                a.gigovId,
                a.gigovNome,
                a.siglaGestor,
                a.nomeGestor,
                a.quantidade_operacoes_nao_cumpriram_criterios,
                a.quantidade_notas_empenho_nao_cumpriram_criterios,
                a.saldo_notas_empenho_nao_cumpriram_criterios,
                3 AS tipoInformacaoId,
                'Operações que ainda não cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao,
                a.created_at,
                a.updated_at
            FROM estatisticas_cte a
            JOIN (
                SELECT
                    MAX(data) AS data
                FROM estatisticas_cte
                GROUP BY YEAR(DATA), MONTH(DATA)
            ) b
            ON a.data = b.data
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = 'DROP VIEW vw_estatisticas';
        $this->execute($query);
    }
}
