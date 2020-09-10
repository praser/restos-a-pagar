<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class RenomearTipoResultadoPrimario extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tipoResultadoPrimario')
            ->rename('tipo_resultado_primario')
            ->update();
    }
}
