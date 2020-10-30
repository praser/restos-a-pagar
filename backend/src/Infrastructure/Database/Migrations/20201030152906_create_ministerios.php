<?php

use Phinx\Migration\AbstractMigration;

class CreateMinisterios extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('ministerios')
            ->addColumn('nome', 'string', ['limit' => 255, 'comment' => 'Nome do ministério'])
            ->addColumn('sigla', 'string', ['limit' => 255, 'comment' => 'Sigla do ministério'])
            ->addColumn('criacao', 'date', ['comment' => 'Data de criação do ministério'])
            ->addColumn('extincao', 'date', ['null' => true, 'comment' => 'Data de extinção do ministério'])
            ->addTimestamps()
            ->addIndex(['nome', 'sigla'], ['unique' => true])
            ->create();
    }
}
