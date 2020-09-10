<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class AddParametrosToVwEstatisticasRedeGestor extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_estatisticas_rede_gestor] AS
            SELECT
                ROW_NUMBER() OVER(ORDER BY saldo_notas_empenho DESC) AS id,
                a.*
            FROM (
                SELECT
                    f.anoExecucao,
                    f.anoOrcamentario,
                    e.gigovId,
                    e.gigovNome,
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
                AND d.id <> f.orcamentoImpositivoTipoResultadoPrimarioId
                WHERE e.situacaoContrato = 'CONTRATADA'
                AND (
                    e.dataAIO IS NULL
                    OR (
                        e.situacaoContratoComplemento = 'SUSPENSIVA'
                        AND e.dataVRPL IS NULL
                    )
                )
                GROUP BY f.anoExecucao, f.anoOrcamentario, e.gigovId, e.gigovNome, c.siglaGestor, c.created_at
            ) a;
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_estatisticas_rede_gestor] AS
            SELECT
                ROW_NUMBER() OVER(ORDER BY saldo_notas_empenho DESC) AS id,
                a.*
            FROM (
                SELECT
                    e.gigovId,
                    e.gigovNome,
                    c.siglaGestor AS siglaGestor,
                    COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                    COUNT(DISTINCT a.documento) AS quantidade_notas_empenho,
                    SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                    c.created_at,
                    c.created_at AS updated_at
                FROM vw_saldos_notas_empenhos a
                JOIN pcasp b
                ON a.pcaspId = b.id
                AND b.conta = 631100000
                JOIN ugs c
                ON a.ugId = c.id
                AND c.codigo <> 250107
                JOIN tipo_resultado_primario d
                ON a.tipoResultadoPrimarioId = d.id
                AND d.idSiafi <> 6
                JOIN operacoes e
                ON a.operacaoId = e.id
                WHERE a.anoOrcamentario = 2018
                AND e.situacaoContrato = 'CONTRATADA'
                AND (
                    e.dataAIO IS NULL
                    OR (
                        e.situacaoContratoComplemento = 'SUSPENSIVA'
                        AND e.dataVRPL IS NULL
                    )
                )
                GROUP BY e.gigovId, e.gigovNome, c.siglaGestor, c.created_at
            ) a;

        SQL;

        $this->execute($query);
    }
}
