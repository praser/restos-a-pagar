<?php

use Phinx\Migration\AbstractMigration;

class AddColumnsToUg extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('ugs')
            ->addColumn('nomeGestor', 'string', ['comment' => 'Nome do ministério siglaGestor da UG', 'limit' => 255, 'null' => true])
            ->addColumn('siglaGestor', 'string', ['comment' => 'Sigla do ministério siglaGestor da UG', 'limit' => 10, 'null' => true])
            ->update();
    }
}
