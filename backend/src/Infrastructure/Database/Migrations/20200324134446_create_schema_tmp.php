<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class CreateSchemaTmp extends AbstractMigration
{
    public function up(): void
    {
        $this->execute('CREATE SCHEMA tmp');
    }

    public function down():void
    {
        $this->execute('DROP SCHEMA tmp');
    }
}
