<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class AddDataCumprimentoCriteriosDesbloqueioToOperacoes extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('operacoes')
            ->addColumn('dataPrimeiroPercentualFisico', 'date', ['comment' => 'Data em que o percentual físico foi lançado pela primeira vez', 'null' => true])
            ->addColumn('dataRetiradaSuspensiva', 'date', ['comment' => 'Data em que a clausula suspensiva foi retirada', 'null' => true])
            ->addColumn('dataCumprimentoCriteriosDesbloqueio', 'date', ['comment' => 'Data em que todos os critérios para o desbloqueio do saldo empenhado foram cumpridos', 'null' => true])
            ->update();
    }
}
