<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class RemoveTmpSaldosNotasEmpenhos extends AbstractMigration
{
    public function change(): void
    {
        $this->table('tmp_saldos_notas_empenhos')->drop()->update();
    }
}
