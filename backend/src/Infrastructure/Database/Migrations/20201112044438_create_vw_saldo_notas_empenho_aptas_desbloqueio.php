<?php

use Phinx\Migration\AbstractMigration;

class CreateVwSaldoNotasEmpenhoAptasDesbloqueio extends AbstractMigration
{
    public function up(): void
    {
        $this->execute('SELECT * INTO cache.saldos_notas_empenhos FROM vw_saldos_notas_empenhos');
        $this->execute('SELECT * INTO cache.operacoes_com_ne_bloqueadas FROM vw_operacoes_com_ne_bloqueadas');

        $query = <<<SQL
            CREATE VIEW vw_saldo_notas_empenho_aptas_desbloqueio AS
            SELECT
                a.id,
                a.pcaspId,
                a.ugId,
                a.operacaoId,
                a.anoOrcamentario,
                a.documento,
                a.dataEmissao,
                a.saldoContaContabil,
                a.created_at,
                a.updated_at,
                a.tipoResultadoPrimarioId,
                a.ptres,
                a.controleArquivoId,
                a.dataReferencia,
                c.operacao,
                c.proposta,
                c.convenio,
                c.aptaDesbloqueio
            FROM cache.saldos_notas_empenhos AS a
            JOIN parametros AS b
            ON a.anoOrcamentario = b.anoOrcamentario
            JOIN cache.operacoes_com_ne_bloqueadas AS c
            ON a.operacaoId = c.id
            AND c.anoOrcamentario = b.anoOrcamentario
            AND c.anoExecucao = b.anoExecucao
            AND c.aptaDesbloqueio = 1
            LEFT JOIN lotes_desbloqueio AS d
            ON b.anoExecucao = d.ano
            LEFT JOIN lote_desbloqueio_operacoes AS e
            ON e.loteDesbloqueioId = d.id
            WHERE e.id IS NULL
            OR e.desbloqueado = 0
        SQL;

        $this->execute($query);
        $this->execute('DROP TABLE cache.saldos_notas_empenhos');
        $this->execute('DROP TABLE cache.operacoes_com_ne_bloqueadas');
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_saldo_notas_empenho_aptas_desbloqueio');
    }
}
