<?php

use Phinx\Migration\AbstractMigration;

class AlterVwOperacoesComNeBloqueadas extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW vw_operacoes_com_ne_passiveis_de_bloqueio AS
            SELECT
                a.id
                ,c.anoExecucao
                ,c.anoOrcamentario
                ,d.tituloConta AS conta
                ,b.operacao
                ,b.dv
                ,b.proposta
                ,b.anoProposta
                ,b.anoOrcamentario AS anoOrcamentarioProposta
                ,b.convenio
                ,b.gigovId
                ,b.gigovNome
                ,b.proponente
                ,b.uf
                ,f.sigla AS siglaGestor
                ,f.nome AS nomeGestor
                ,b.enquadramentoLegislacao
                ,b.enquadramentoLegislacaoComplemento
                ,b.situacaoContrato
                ,b.situacaoContratoComplemento
                ,b.percentualFisicoAferido
                ,b.percentualFinanceiroDesbloqueado
                ,b.dataVigencia
                ,b.dataSPA
                ,b.dataVRPL
                ,b.dataAIO
                ,b.valorRepasse
                ,b.valorDesembolsado
                ,b.objeto
                ,b.dataCumprimentoCriteriosDesbloqueio
                ,b.aptaDesbloqueio
                ,b.created_at
                ,b.updated_at
            FROM saldos_notas_empenhos AS a
            JOIN operacoes AS b
            ON a.operacaoId = b.id
            JOIN dbo.parametros AS c
            ON 1 = 1
            JOIN pcasp AS d
            ON a.pcaspId = d.id
            AND d.ano = c.anoExecucao
            AND d.classe = c.pcaspClasse
            AND d.grupo = c.pcaspGrupo
            AND d.subgrupo = c.pcaspSubgrupo
            AND d.titulo = c.pcaspTituloBloqueio
            JOIN ugs AS e
            ON a.ugId = e.id
            JOIN ministerios AS f
            ON e.ministerioId = f.id
            WHERE dataReferencia = (
                SELECT TOP 1 
                    dataReferencia
                FROM saldos_notas_empenhos
                WHERE dataReferencia >= c.dataBloqueio
                AND dataReferencia <= c.dataCancelamento
                ORDER BY dataReferencia DESC
            )
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
}
