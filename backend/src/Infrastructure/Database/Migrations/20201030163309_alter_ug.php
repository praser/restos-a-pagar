<?php

use Phinx\Migration\AbstractMigration;

class AlterUg extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('ugs')
            ->removeColumn('nomeGestor')
            ->removeColumn('siglaGestor')
            ->addColumn('criacao', 'date', ['after' => 'nome', 'default' => '2020-01-01' ,'comment' => 'Data de criação da UG'])
            ->addColumn('extincao', 'date', ['after' => 'criacao', 'null' => true, 'comment' => 'Data de extinção da UG'])
            ->addColumn('ministerioId', 'integer', ['after' => 'extincao', 'default' => 1, 'comment' => 'Id da tabela ministérios'])
            ->update();
    }
}
