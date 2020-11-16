<?php

use Phinx\Migration\AbstractMigration;

class CreateVwSaldoNotasEmpenhoAptasDesbloqueio extends AbstractMigration
{
    public function up(): void
    {
        $this->execute("IF OBJECT_ID('cache.saldos_notas_empenhos', 'U') IS NULL SELECT * INTO cache.saldos_notas_empenhos FROM vw_saldos_notas_empenhos" );
        $this->execute("IF OBJECT_ID('cache.operacoes_com_ne_bloqueadas', 'U') IS NULL SELECT * INTO cache.operacoes_com_ne_bloqueadas FROM vw_operacoes_com_ne_bloqueadas");

        $query = <<<SQL
            CREATE VIEW vw_saldo_notas_empenho_aptas_desbloqueio AS
            SELECT
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
            LEFT JOIN lotes_desbloqueio AS e
            ON e.ano = c.anoExecucao
            LEFT JOIN lote_desbloqueio_operacoes f
            ON f.loteDesbloqueioId = e.id
            AND f.documento = a.documento
            WHERE a.dataReferencia = (SELECT MAX(dataReferencia) FROM saldos_notas_empenhos)
            AND a.tipoResultadoPrimarioId NOT IN (SELECT tipoResultadoPrimarioId FROM parametros_tipo_resultado_primario_nao_participante)
            AND a.ugId NOT IN (SELECT ugId FROM parametros_ug_nao_participantes)
            AND b.situacaoContrato = 'CONTRATADA'
            AND b.aptaDesbloqueio = 1
            AND (
                f.id IS NULL
                OR f.desbloqueado = 0
            )	
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_saldo_notas_empenho_aptas_desbloqueio');
    }
}
