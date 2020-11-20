<?php

use Phinx\Migration\AbstractMigration;

class RenameVwEstatiscias extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('vw_estatisticas')
            ->rename('vw_estatisticas_pre_bloqueio')
            ->update();
    }
}
