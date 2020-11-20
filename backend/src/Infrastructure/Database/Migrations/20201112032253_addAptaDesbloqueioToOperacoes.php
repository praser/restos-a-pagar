<?php

use Phinx\Migration\AbstractMigration;

class addAptaDesbloqueiotoOperacoes extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('operacoes')
            ->addColumn('aptaDesbloqueio', 'boolean', ['default' => false, 'null' => true, 'comment' => 'Flag informando se uma operação está apta para o desbloqueio no ano corrent'])
            ->update();
    }
}
