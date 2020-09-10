<?php

use Phinx\Migration\AbstractMigration;

class AddValorDesembolsadoToOperacoes extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('operacoes')
            ->addColumn('valorDesembolsado', 'decimal', ['precision' => 18, 'scale' => 2, 'null' => true])
            ->update();
    }
}
