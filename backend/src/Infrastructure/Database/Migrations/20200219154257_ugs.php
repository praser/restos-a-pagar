<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class Ugs extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('ugs')
            ->addColumn('codigo', 'integer', ['comment' => 'Cógido da UG'])
            ->addColumn('arquivo', 'string', ['limit' => 255, 'comment' => 'Nome da UG'])
            ->addTimestamps()
            ->addIndex(['codigo'], ['unique' => true])
            ->create();
    }
}
