<?php

use Phinx\Migration\AbstractMigration;

class AlterVwLotesDesbloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW vw_lotes_desbloqueio AS
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
            ON a.id = b.loteDesbloqueioId;
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW vw_lotes_desbloqueio AS
            SELECT
                a.id
                ,a.sequencial
                ,a.ano
                ,a.ce
                ,a.responsavelId
                ,a.situacao
                ,a.created_at
                ,a.updated_at
                ,a.responsavelNome
                ,a.responsavelUnidadeId
                ,a.responsavelUnidadeSigla
                ,a.liminarId
                ,b.empenhos
            FROM lotes_desbloqueio AS a
            JOIN (
                SELECT
                    loteDesbloqueioId,
                    count(*) AS empenhos
                FROM lote_desbloqueio_operacoes
                GROUP BY loteDesbloqueioId
            ) AS b
            ON a.id = b.loteDesbloqueioId;
        SQL;

        $this->execute($query);
    }
}
