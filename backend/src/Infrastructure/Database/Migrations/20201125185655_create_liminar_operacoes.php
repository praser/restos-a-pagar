<?php

use Phinx\Migration\AbstractMigration;

class CreateLiminarOperacoes extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('liminar_operacoes')
            ->addColumn('liminarId', 'integer', ['comment' => 'Id da liminar'])
            ->addColumn('operacaoId', 'integer', ['comment' => 'Id da operacao'])
            ->addTimestamps()
            ->addForeignKeyWithName('fk_liminares_liminar_operacoes', 'liminarId', 'liminares')
            ->addForeignKeyWithName('fk_operacoes_liminar', 'operacaoId', 'operacoes')
            ->create();
    }
}
