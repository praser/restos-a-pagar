<?php

use Phinx\Migration\AbstractMigration;

class AddMd5ToLoteDesbloqueio extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('lotes_desbloqueio')
            ->addColumn('checksum', 'string', ['limit' => 32, 'comment' => 'Checksum MD5 do arquivo de lote', 'null' => true])
            ->update();
    }
}
