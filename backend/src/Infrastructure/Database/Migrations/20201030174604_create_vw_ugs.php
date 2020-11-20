<?php

use Phinx\Migration\AbstractMigration;

class CreateVwUgs extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_ugs AS
            SELECT
                b.id,
                b.codigo,
                b.nome,
                a.nome AS nomeGestor,
                a.sigla AS siglaGestor,
                b.created_at,
                b.updated_at
            FROM dbo.ministerios a
            JOIN dbo.ugs b
            ON a.id = b.ministerioId
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_ugs');
    }
}
