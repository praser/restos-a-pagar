<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class VwJobProgress extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            -- noinspection SqlResolveForFile
            CREATE VIEW vw_job_progress AS
            SELECT
                a.id,
                a.fila,
                a.uuid,
                a.quantidadeRegistros,
                ISNULL(b.quantidadeProcessados, 0) AS quantidadeProcessados,
                a.inicioProcessamento,
                a.fimProcessamento,
                a.status,
                a.created_at,
                a.updated_at
            FROM jobs a
            LEFT JOIN (
                SELECT
                    jobId,
                    count(*) AS quantidadeProcessados
                FROM tmp_saldos_notas_empenhos
                GROUP BY jobId
            ) b
            ON a.id = b.jobId
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_job_progress');
    }
}
