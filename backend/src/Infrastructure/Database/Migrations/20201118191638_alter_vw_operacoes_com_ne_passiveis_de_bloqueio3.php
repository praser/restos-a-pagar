<?php

use Phinx\Migration\AbstractMigration;

class AlterVwOperacoesComNePassiveisDeBloqueio3 extends AbstractMigration
{
    public function up(): void
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
