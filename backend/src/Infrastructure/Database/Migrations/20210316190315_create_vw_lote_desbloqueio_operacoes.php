<?php

use Phinx\Migration\AbstractMigration;

class CreateVwLoteDesbloqueioOperacoes extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_lote_desbloqueio_operacoes AS
            SELECT
                b.sequencial,
                b.ano,
                c.operacao,
                c.convenio,
                a.*
            FROM lote_desbloqueio_operacoes AS a
            JOIN lotes_desbloqueio AS b
            ON a.loteDesbloqueioId = b.id
            JOIN operacoes AS c
            ON a.operacaoId = c.id
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_lote_desbloqueio_operacoes');
    }
}
