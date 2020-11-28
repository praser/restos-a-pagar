<?php

use Phinx\Migration\AbstractMigration;

class AlterLotesDesbloqueio2 extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('lotes_desbloqueio')
            ->addColumn('liminarId', 'integer', ['comment' => 'Id da liminar que originou o lote de desbloqueio', 'null' => true])
            ->addForeignKeyWithName('fk_lotes_desbloqueio_liminares', 'liminarId', 'liminares', 'id')
            ->update();
    }
}
