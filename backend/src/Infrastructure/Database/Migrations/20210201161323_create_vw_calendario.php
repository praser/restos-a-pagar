<?php

use Phinx\Migration\AbstractMigration;

class CreateVwCalendario extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_calendario AS
            SELECT
                *,
                (
                    SELECT DISTINCT TOP 1
                        dataReferencia
                    FROM saldos_notas_empenhos
                    WHERE dataReferencia <= datas.data
                    ORDER by dataReferencia DESC
                ) AS dataReferencia
            FROM (
                SELECT
                    DATEADD(DAY,number, b.dataBloqueio) AS data
                FROM master..spt_values AS a
                JOIN parametros AS b
                ON YEAR(DATEADD(DAY,number, b.dataBloqueio)) = b.anoExecucao
                WHERE type = 'P'
                AND DATEADD(DAY, a.number, b.dataBloqueio) <= GETDATE()
            ) AS datas
        SQL;

        $this->execute($query);
        $this->execute('SELECT * INTO cache.calendario FROM vw_calendario');
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_calendario');
        $this->execute('DROP TABLE cache.calendario');
    }

}
