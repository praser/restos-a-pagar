<?php

use Phinx\Migration\AbstractMigration;

class AlterVwEstatisticasBloqueio3 extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_estatisticas_bloqueio] AS
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
                SELECT distinct
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
                    SELECT distinct 
                        MIN(a.id) AS id,
                        g.anoExecucao,
                        g.anoOrcamentario,
                        CONVERT(DATE, a.dataReferencia) AS data,
                        f.gigovId,
                        f.gigovNome,
                        d.sigla AS siglaGestor,
                        d.nome AS nomeGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(a.id) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(DISTINCT a.operacaoId)
                        ELSE 0
                        END AS quantidade_operacoes_cumpriram_criterios,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(a.operacaoId)
                        ELSE 0
                        END AS quantidade_notas_empenho_cumpriram_criterios,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN SUM(a.saldoContaContabil)
                        ELSE 0
                        END AS saldo_notas_empenho_cumpriram_criterios,
                        MAX(a.created_at) AS created_at,
                        MAX(a.updated_at) AS updated_at
                    FROM saldos_notas_empenhos a
                    JOIN pcasp AS b
                    ON a.pcaspId = b.id
                    JOIN ugs AS c
                    ON a.ugId = c.id
                    JOIN ministerios d
                    ON c.ministerioId = d.id
                    JOIN tipo_resultado_primario e
                    ON a.tipoResultadoPrimarioId = e.id
                    JOIN operacoes f
                    ON a.operacaoId = f.id
                    JOIN parametros g
                    ON a.anoOrcamentario = g.anoOrcamentario
                    AND b.classe = g.pcaspClasse
                    AND b.grupo = g.pcaspGrupo
                    AND b.subgrupo = g.pcaspSubgrupo
                    AND b.titulo = g.pcaspTituloBloqueio
                    AND c.id NOT IN (SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = g.id)
                    AND e.id NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = g.id)
                    WHERE f.situacaoContrato = 'CONTRATADA'
                    AND dataReferencia >= g.dataBloqueio
                    AND dataReferencia <= g.dataCancelamento
                    GROUP BY
                        a.dataReferencia,
                        g.anoExecucao,
                        g.anoOrcamentario,
                        f.gigovId,
                        f.gigovNome,
                        d.sigla,
                        d.nome,
                        f.dataCumprimentoCriteriosDesbloqueio
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
                a.quantidade_operacoes AS quantidadeOperacoes,
                a.quantidade_notas_empenho AS quantidadeDocumentos,
                a.saldo_notas_empenho AS saldoBloqueado,
                0 AS saldoDesbloqueado,
                0 AS saldoAguardandoDesbloqueio,
                1 AS tipoInformacaoId,
                'Todas as operações' AS tipoInformacaoDescricao
            FROM estatisticas_cte a
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
                0 AS saldoDesloqueado,
                0 AS saldoAguardandoDesbloqueio,
                2 AS tipoInformacaoId,
                'Operações que já cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao
            FROM estatisticas_cte a
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
                0 AS saldoDesloqueado,
                0 AS saldoAguardandoDesbloqueio,
                3 AS tipoInformacaoId,
                'Operações que ainda não cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao
            FROM estatisticas_cte a
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_estatisticas_bloqueio] AS
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
                SELECT distinct
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
                    SELECT distinct 
                        MIN(a.id) AS id,
                        g.anoExecucao,
                        g.anoOrcamentario,
                        CONVERT(DATE, a.dataReferencia) AS data,
                        f.gigovId,
                        f.gigovNome,
                        d.sigla AS siglaGestor,
                        d.nome AS nomeGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(a.id) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(DISTINCT a.operacaoId)
                        ELSE 0
                        END AS quantidade_operacoes_cumpriram_criterios,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN COUNT(a.operacaoId)
                        ELSE 0
                        END AS quantidade_notas_empenho_cumpriram_criterios,
                        CASE
                        WHEN f.dataCumprimentoCriteriosDesbloqueio <= a.dataReferencia THEN SUM(a.saldoContaContabil)
                        ELSE 0
                        END AS saldo_notas_empenho_cumpriram_criterios,
                        MAX(a.created_at) AS created_at,
                        MAX(a.updated_at) AS updated_at
                    FROM saldos_notas_empenhos a
                    JOIN pcasp AS b
                    ON a.pcaspId = b.id
                    JOIN ugs AS c
                    ON a.ugId = c.id
                    JOIN ministerios d
                    ON c.ministerioId = d.id
                    JOIN tipo_resultado_primario e
                    ON a.tipoResultadoPrimarioId = e.id
                    JOIN operacoes f
                    ON a.operacaoId = f.id
                    JOIN parametros g
                    ON a.anoOrcamentario = g.anoOrcamentario
                    AND b.classe = g.pcaspClasse
                    AND b.grupo = g.pcaspGrupo
                    AND b.subgrupo = g.pcaspSubgrupo
                    AND b.titulo = g.pcaspTituloBloqueio
                    AND c.id NOT IN (SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = g.id)
                    AND e.id NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = g.id)
                    WHERE f.situacaoContrato = 'CONTRATADA'
                    AND dataReferencia = (SELECT max(datareferencia) FROM saldos_notas_empenhos)
                    GROUP BY
                        a.dataReferencia,
                        g.anoExecucao,
                        g.anoOrcamentario,
                        f.gigovId,
                        f.gigovNome,
                        d.sigla,
                        d.nome,
                        f.dataCumprimentoCriteriosDesbloqueio
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
                a.quantidade_operacoes AS quantidadeOperacoes,
                a.quantidade_notas_empenho AS quantidadeDocumentos,
                a.saldo_notas_empenho AS saldoBloqueado,
                0 AS saldoDesbloqueado,
                0 AS saldoAguardandoDesbloqueio,
                1 AS tipoInformacaoId,
                'Todas as operações' AS tipoInformacaoDescricao
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
                0 AS saldoDesloqueado,
                0 AS saldoAguardandoDesbloqueio,
                2 AS tipoInformacaoId,
                'Operações que já cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao
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
                0 AS saldoDesloqueado,
                0 AS saldoAguardandoDesbloqueio,
                3 AS tipoInformacaoId,
                'Operações que ainda não cumpriram os critérios de desbloqueio' AS tipoInformacaoDescricao
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
