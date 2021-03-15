<?php

use Phinx\Migration\AbstractMigration;

class AlterVwOperacoesComNePassiveisDeBloqueio4 extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
            SELECT DISTINCT
                f.id
                ,g.anoExecucao
                ,g.anoOrcamentario
                ,b.tituloConta AS conta
                ,f.operacao
                ,f.dv
                ,f.proposta
                ,f.anoProposta
                ,f.anoOrcamentario AS anoOrcamentarioProposta
                ,f.convenio
                ,f.gigovId
                ,f.gigovNome
                ,f.proponente
                ,f.uf
                ,d.sigla AS siglaGestor
                ,d.nome AS nomeGestor
                ,f.enquadramentoLegislacao
                ,f.enquadramentoLegislacaoComplemento
                ,f.situacaoContrato
                ,f.situacaoContratoComplemento
                ,f.percentualFisicoAferido
                ,f.percentualFinanceiroDesbloqueado
                ,f.dataVigencia
                ,f.dataSPA
                ,f.dataVRPL
                ,f.dataAIO
                ,f.valorRepasse
                ,f.valorDesembolsado
                ,f.objeto
                ,f.dataRetiradaSuspensiva
                ,f.dataCumprimentoCriteriosDesbloqueio
                ,f.aptaDesbloqueio
                ,f.created_at
                ,f.updated_at
            FROM saldos_notas_empenhos AS a
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
            AND YEAR(a.dataReferencia) = g.anoExecucao
            AND a.dataReferencia <= g.dataBloqueio
            AND b.classe = g.pcaspClasse
            AND b.grupo = g.pcaspGrupo
            AND b.subgrupo = g.pcaspSubgrupo
            AND b.titulo = g.pcaspTituloPreBloqueio
            AND c.id NOT IN (SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = g.id)
            AND e.id NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = g.id)
            JOIN (
                SELECT
                    b.id,
                    MAX(dataReferencia) AS dataReferencia
                FROM saldos_notas_empenhos AS a
                JOIN parametros AS b
                ON a.dataReferencia < b.dataBloqueio
                GROUP BY b.id
            ) AS h
            ON a.dataReferencia = h.dataReferencia
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_operacoes_com_ne_passiveis_de_bloqueio] AS
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
                ,b.dataRetiradaSuspensiva
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
            );
        SQL;

        $this->execute($query);
    }
}
