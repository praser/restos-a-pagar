<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class MudaCriteriosVwOperacoesComNePassiveisBloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
            SELECT DISTINCT
                c.id,
                g.anoExecucao,
                g.anoOrcamentario,
                c.conta,
                a.operacao,
                a.dv,
                a.proposta,
                a.anoProposta,
                a.anoOrcamentario AS anoOrcamentarioProposta,
                a.convenio,
                a.created_at,
                a.updated_at,
                a.gigovId,
                a.gigovNome,
                a.proponente,
                a.uf,
                d.siglaGestor,
                d.nomeGestor,
                a.enquadramentoLegislacao,
                a.enquadramentoLegislacaoComplemento,
                a.situacaoContrato,
                a.situacaoContratoComplemento,
                a.percentualFisicoAferido,
                a.percentualFinanceiroDesbloqueado,
                a.dataVigencia,
                a.dataSPA,
                a.dataVRPL,
                a.dataAIO,
                a.dataCumprimentoCriteriosDesbloqueio,
                a.valorRepasse,
                a.objeto
            FROM operacoes a
            JOIN vw_saldos_notas_empenhos b
            ON a.id = b.operacaoId
            JOIN pcasp c
            ON b.pcaspId = c.id
            JOIN ugs d
            ON b.ugId = d.id
            JOIN tipo_resultado_primario e
            ON b.tipoResultadoPrimarioId = e.id
            JOIN operacoes f
            ON a.operacao = f.operacao
            JOIN parametros g
            ON b.anoOrcamentario = g.anoOrcamentario
            AND c.id = g.rpNaoProcessadosALiquidarPcaspId
            AND d.id <> g.saudeUgId
            AND e.id <> g.orcamentoImpositivoTipoResultadoPrimarioId
            WHERE f.situacaoContrato = 'CONTRATADA'
        SQL;

        $this->execute($query);

    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
            SELECT DISTINCT
                c.id,
                g.anoExecucao,
                g.anoOrcamentario,
                c.conta,
                a.operacao,
                a.dv,
                a.proposta,
                a.anoProposta,
                a.anoOrcamentario AS anoOrcamentarioProposta,
                a.convenio,
                a.created_at,
                a.updated_at,
                a.gigovId,
                a.gigovNome,
                a.proponente,
                a.uf,
                a.gestor,
                a.enquadramentoLegislacao,
                a.enquadramentoLegislacaoComplemento,
                a.situacaoContrato,
                a.situacaoContratoComplemento,
                a.percentualFisicoAferido,
                a.percentualFinanceiroDesbloqueado,
                a.dataVigencia,
                a.dataSPA,
                a.dataVRPL,
                a.dataAIO,
                a.valorRepasse,
                a.objeto
            FROM operacoes a
            JOIN vw_saldos_notas_empenhos b
            ON a.id = b.operacaoId
            JOIN pcasp c
            ON b.pcaspId = c.id
            JOIN ugs d
            ON b.ugId = d.id
            JOIN tipo_resultado_primario e
            ON b.tipoResultadoPrimarioId = e.id
            JOIN operacoes f
            ON a.operacao = f.operacao
            JOIN parametros g
            ON b.anoOrcamentario = g.anoOrcamentario
            AND c.id = g.rpNaoProcessadosALiquidarPcaspId
            AND d.id <> g.saudeUgId
            AND e.id <> g.orcamentoImpositivoTipoResultadoPrimarioId
            WHERE f.situacaoContrato = 'CONTRATADA'
            AND (
                f.dataAIO IS NULL
                OR (
                    f.situacaoContratoComplemento = 'SUSPENSIVA'
                    AND f.dataVRPL IS NULL
                )
            );
        SQL;

        $this->execute($query);

    }
}
