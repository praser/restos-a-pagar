<?php

use Phinx\Migration\AbstractMigration;

class DropSchemaSnapshot extends AbstractMigration
{
    public function up(): void
    {
        $query = 'DROP SCHEMA snapshot';
        $this->execute($query);
    }

    public function down(): void
    {
        $query = 'CREATE SCHEMA snapshot';
        $this->execute($query);
    }
}
