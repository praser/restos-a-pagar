<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class RenomearColunasTmpSaldoNotaEmpenho extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_saldos_notas_empenhos')
            ->renameColumn('resultadoPrimarioId', 'tipoResultadoPrimarioId')
            ->renameColumn('resultadoPrimarioDescricao', 'tipoResultadoPrimarioDescricao')
            ->update();
    }
}
