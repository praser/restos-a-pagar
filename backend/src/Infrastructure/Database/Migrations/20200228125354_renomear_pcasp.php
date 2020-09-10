<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class RenomearPCASP extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('plano_contas_aplicado_setor_publico')
            ->rename('pcasp')
            ->update();
    }
}
