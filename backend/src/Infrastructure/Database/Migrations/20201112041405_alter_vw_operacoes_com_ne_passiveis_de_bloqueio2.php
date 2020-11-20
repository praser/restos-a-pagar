<?php

use Phinx\Migration\AbstractMigration;

class AlterVwOperacoesComNePassiveisDeBloqueio2 extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
            SELECT DISTINCT
                a.id,
                h.anoExecucao,
                h.anoOrcamentario,
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
                e.sigla AS siglaGestor,
                d.nome AS nomeGestor,
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
                ISNULL(a.valorDesembolsado, 0) AS valorDesembolsado,
                a.objeto,
                a.aptaDesbloqueio
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
            AND c.titulo = h.pcaspTituloPreBloqueio
            AND d.id NOT IN (
                SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = h.id
            )
            AND f.id NOT IN (
                SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = h.id
            )
            WHERE g.situacaoContrato = 'CONTRATADA';
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
            SELECT DISTINCT
                a.id,
                h.anoExecucao,
                h.anoOrcamentario,
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
                e.sigla AS siglaGestor,
                d.nome AS nomeGestor,
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
                ISNULL(a.valorDesembolsado, 0) AS valorDesembolsado,
                a.objeto
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
            AND c.titulo = h.pcaspTituloPreBloqueio
            AND d.id NOT IN (
                SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = h.id
            )
            AND f.id NOT IN (
                SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = h.id
            )
            WHERE g.situacaoContrato = 'CONTRATADA';
        SQL;

        $this->execute($query);
    }
}
