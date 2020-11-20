<?php

use Phinx\Migration\AbstractMigration;

class CreateSchemaSnapshot extends AbstractMigration
{
    public function up(): void
    {
        $query = 'CREATE SCHEMA snapshot';
        $this->execute($query);
    }

    public function down(): void
    {
        $query = 'DROP SCHEMA snapshot';
        $this->execute($query);
    }
}
