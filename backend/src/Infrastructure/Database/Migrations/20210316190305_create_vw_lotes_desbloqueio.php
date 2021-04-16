<?php

use Phinx\Migration\AbstractMigration;

class CreateVwLotesDesbloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_lotes_desbloqueio AS
            SELECT
                a.*
                ,b.empenhos
            FROM lotes_desbloqueio AS a
            JOIN (
                SELECT
                    loteDesbloqueioId,
                    count(*) AS empenhos
                FROM lote_desbloqueio_operacoes
                GROUP BY loteDesbloqueioId
            ) AS b
            ON a.id = b.loteDesbloqueioId
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_lotes_desbloqueio');
    }
}
