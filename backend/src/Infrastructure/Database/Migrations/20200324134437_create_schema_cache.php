<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class CreateSchemaCache extends AbstractMigration
{
    public function up():void
    {
        $this->execute('CREATE SCHEMA cache');
    }

    public function down(): void
    {
        $this->execute('DROP SCHEMA cache');
    }
}
