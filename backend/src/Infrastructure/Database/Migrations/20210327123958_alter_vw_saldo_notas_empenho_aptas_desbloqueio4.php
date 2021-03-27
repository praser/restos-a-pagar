<?php

use Phinx\Migration\AbstractMigration;

class AlterVwSaldoNotasEmpenhoAptasDesbloqueio4 extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_saldo_notas_empenho_aptas_desbloqueio] AS
           SELECT DISTINCT
                a.id
                ,a.operacaoId
                ,a.pcaspId
                ,a.ugId
                ,a.tipoResultadoPrimarioId
                ,a.controleArquivoId
                ,b.operacao
                ,b.convenio
                ,b.proposta
                ,a.documento
                ,a.anoOrcamentario
                ,a.saldoContaContabil
                ,a.ptres
                ,a.dataReferencia
                ,a.created_at
                ,a.updated_at
            FROM cache.saldos_notas_empenhos AS a
            JOIN operacoes AS b
            ON a.operacaoId = b.id
            JOIN parametros c
            ON a.anoOrcamentario = c.anoOrcamentario
            JOIN pcasp AS d
            ON d.ano = c.anoExecucao
            AND d.classe = c.pcaspClasse
            AND d.grupo = c.pcaspGrupo
            AND d.subgrupo = c.pcaspSubgrupo
            AND d.titulo = c.pcaspTituloBloqueio
            AND a.pcaspId = d.id
            LEFT JOIN lote_desbloqueio_operacoes AS e
            ON e.documento = a.documento
            AND e.operacaoId = a.operacaoId
            LEFT JOIN lotes_desbloqueio AS f
            ON e.loteDesbloqueioId = f.id
            AND c.anoExecucao = f.ano
            WHERE a.dataReferencia = (SELECT MAX(dataReferencia) FROM saldos_notas_empenhos)
            AND a.tipoResultadoPrimarioId NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = c.id)
            AND a.ugId NOT IN (SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = c.id)
            AND (
                e.id IS NULL
                OR e.desbloqueado = 0
            )
            AND b.aptaDesbloqueio = 1; 
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_saldo_notas_empenho_aptas_desbloqueio] AS
            SELECT DISTINCT
                a.*
            FROM cache.saldos_notas_empenhos AS a
            JOIN operacoes AS b
            ON a.operacaoId = b.id
            JOIN parametros c
            ON a.anoOrcamentario = c.anoOrcamentario
            JOIN pcasp AS d
            ON d.ano = c.anoExecucao
            AND d.classe = c.pcaspClasse
            AND d.grupo = c.pcaspGrupo
            AND d.subgrupo = c.pcaspSubgrupo
            AND d.titulo = c.pcaspTituloBloqueio
            AND a.pcaspId = d.id
            LEFT JOIN lote_desbloqueio_operacoes AS e
            ON e.documento = a.documento
            AND e.operacaoId = a.operacaoId
            LEFT JOIN lotes_desbloqueio AS f
            ON e.loteDesbloqueioId = f.id
            AND c.anoExecucao = f.ano
            WHERE a.dataReferencia = (SELECT MAX(dataReferencia) FROM saldos_notas_empenhos)
            AND a.tipoResultadoPrimarioId NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante WHERE parametroId = c.id)
            AND a.ugId NOT IN (SELECT ugId FROM parametros_ug_nao_participantes WHERE parametroId = c.id)
            AND (
                e.id IS NULL
                OR e.desbloqueado = 0
            )
            AND b.aptaDesbloqueio = 1;
        SQL;

        $this->execute($query);
    }
}
