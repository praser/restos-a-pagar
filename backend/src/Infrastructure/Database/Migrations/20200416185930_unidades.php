<?php

use Phinx\Migration\AbstractMigration;

class Unidades extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_unidades AS
            SELECT DISTINCT
                gigovId AS id,
                gigovNome AS nome,
                MIN(created_at) AS created_at,
                MAX(updated_at) AS updated_at
            FROM dbo.operacoes
            GROUP BY gigovId, gigovNome
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_unidades');
    }
}
