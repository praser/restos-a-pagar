<?php

use Phinx\Migration\AbstractMigration;

class Jobs extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('jobs')
            ->addColumn('fila', 'string', ['limit' => 255, 'comment' => 'Fila em que o Job foi inserido'])
            ->addColumn('uuid', 'string', ['limit' => 255, 'comment' => 'Id do uuid'])
            ->addColumn('quantidadeRegistros', 'integer', ['comment' => 'Quantidade de registros contidos no uuid'])
            ->addColumn('inicioProcessamento', 'datetime', ['null' => true, 'comment' => 'Data e hora do início do processamento'])
            ->addColumn('fimProcessamento', 'datetime', ['null' => true, 'comment' => 'Data e hora do término do processamento'])
            ->addColumn('status', 'string', ['limit' => 255, 'comment' => 'Situação do uuid'])
            ->addTimestamps()
            ->addIndex('uuid', ['unique' => true])
            ->create();
    }
}
