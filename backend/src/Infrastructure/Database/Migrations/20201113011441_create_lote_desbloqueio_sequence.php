<?php

use Phinx\Migration\AbstractMigration;

class CreateLoteDesbloqueioSequence extends AbstractMigration
{
    public function up()
    {
        $query = <<<SQL
            CREATE SEQUENCE lote_desbloqueio_sequence
            AS tinyint
            START WITH 1
            INCREMENT BY 1
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP SEQUENCE lote_desbloqueio_sequence');
    }
}
