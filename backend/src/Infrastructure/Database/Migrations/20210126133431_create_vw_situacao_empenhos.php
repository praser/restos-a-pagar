<?php

use Phinx\Migration\AbstractMigration;

class CreateVwSituacaoEmpenhos extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_situacao_empenhos AS
            SELECT
                max(d.id) AS id
                ,c.operacao
                ,c.convenio
                ,c.gigovNome
                ,f.sigla AS siglaGestor
                ,c.proponente
                ,a.documento
                ,a.saldo
                ,RIGHT(CONCAT('000', b.sequencial, '/', b.ano), 8) AS loteDesbloqueio
                ,a.updated_at AS dataDesbloqueio
                ,CASE 
                WHEN a.desbloqueado = 1 THEN 'desbloqueado'
                WHEN a.desbloqueado IS NULL THEN 'aguardando processamento'
                END as situacao
                ,b.ano AS anoExecucao
                ,MAX(d.created_at) AS created_at
                ,MAX(d.updated_at) AS updated_at
            FROM lote_desbloqueio_operacoes AS a
            JOIN lotes_desbloqueio AS b
            ON a.loteDesbloqueioId = b.id
            JOIN operacoes AS c
            ON a.operacaoId = c.id
            JOIN dbo.saldos_notas_empenhos AS d
            ON a.operacaoId = d.operacaoId
            AND a.documento = d.documento
            JOIN ugs AS e
            ON d.ugId = e.id
            JOIN ministerios AS f
            ON e.ministerioId = f.id
            WHERE a.desbloqueado = 1
            OR a.desbloqueado IS NULL
            GROUP BY
                c.operacao
                ,c.convenio
                ,c.gigovNome
                ,f.sigla
                ,c.proponente
                ,a.documento
                ,a.saldo
                ,b.sequencial
                ,a.updated_at
                ,a.desbloqueado
                ,b.ano
            UNION ALL
            SELECT
                MAX(b.id) AS id
                ,a.operacao
                ,a.convenio
                ,a.gigovNome
                ,e.sigla AS siglaGestor
                ,a.proponente
                ,b.documento
                ,b.saldoContaContabil AS saldo
                ,NULL AS loteDesbloqueo
                ,NULL AS dataDesbloqueio
                ,'bloqueado' AS situacao
                ,h.anoExecucao
                ,MAX(b.created_at) AS created_at
                ,MAX(b.updated_at) AS updated_at
            FROM operacoes AS a
            JOIN vw_saldos_notas_empenhos AS b
            ON a.id = b.operacaoId
            JOIN pcasp AS c
            ON b.pcaspId = c.id
            JOIN ugs AS d
            ON b.ugId = d.id
            JOIN ministerios AS e
            ON d.ministerioId = e.id
            JOIN tipo_resultado_primario AS f
            ON b.tipoResultadoPrimarioId = f.id
            JOIN operacoes AS g
            ON a.operacao = g.operacao
            JOIN parametros AS h
            ON b.anoOrcamentario = h.anoOrcamentario
            AND c.classe = h.pcaspClasse
            AND c.grupo = h.pcaspGrupo
            AND c.subgrupo = h.pcaspSubgrupo
            AND c.titulo = h.pcaspTituloBloqueio
            AND d.id NOT IN (
                SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = h.id
            )
            AND f.id NOT IN (
                SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = h.id
            )
            WHERE g.situacaoContrato = 'CONTRATADA'
            AND dataReferencia = (
                SELECT
                    MAX(datareferencia)
                FROM dbo.saldos_notas_empenhos
                WHERE YEAR(dataReferencia) = h.anoExecucao
            )
            GROUP BY
                a.operacao
                ,a.convenio
                ,a.gigovNome
                ,e.sigla
                ,a.proponente
                ,b.documento
                ,b.saldoContaContabil
                ,h.anoExecucao
            UNION ALL
            SELECT
                MAX(b.id) AS id
                ,a.operacao
                ,a.convenio
                ,a.gigovNome
                ,e.sigla AS siglaGestor
                ,a.proponente
                ,b.documento
                ,b.saldoContaContabil AS saldo
                ,NULL AS loteDesbloqueo
                ,NULL AS dataDesbloqueio
                ,'snapshot' AS situacao
                ,h.anoExecucao
                ,MAX(b.created_at) AS created_at
                ,MAX(b.updated_at) AS updated_at
            FROM operacoes AS a
            JOIN dbo.saldos_notas_empenhos AS b
            ON a.id = b.operacaoId
            JOIN pcasp AS c
            ON b.pcaspId = c.id
            JOIN ugs AS d
            ON b.ugId = d.id
            JOIN ministerios AS e
            ON d.ministerioId = e.id
            JOIN tipo_resultado_primario AS f
            ON b.tipoResultadoPrimarioId = f.id
            JOIN operacoes AS g
            ON a.operacao = g.operacao
            JOIN parametros AS h
            ON b.anoOrcamentario = h.anoOrcamentario
            AND c.classe = h.pcaspClasse
            AND c.grupo = h.pcaspGrupo
            AND c.subgrupo = h.pcaspSubgrupo
            AND c.titulo = h.pcaspTituloBloqueio
            AND d.id NOT IN (
                SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = h.id
            )
            AND f.id NOT IN (
                SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = h.id
            )
            AND b.dataReferencia = h.dataBloqueio
            WHERE g.situacaoContrato = 'CONTRATADA'
            GROUP BY
                a.operacao
                ,a.convenio
                ,a.gigovNome
                ,e.sigla
                ,a.proponente
                ,b.documento
                ,b.saldoContaContabil
                ,h.anoExecucao
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_situacao_empenhos');
    }
}
