<?php

use Phinx\Migration\AbstractMigration;

class CreateParametrosUgNaoParticipantes extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('parametros_ug_nao_participantes')
            ->addColumn('parametroId', 'integer', ['comment' => 'Id da tabela parametros'])
            ->addColumn('ugId', 'integer', ['comment' => 'Id da tabela ugs'])
            ->addForeignKeyWithName('fk_parametros_parametro_ug_nao_participante', 'parametroId', 'parametros', 'id')
            ->addForeignKeyWithName('fk_ug_parametros_ug_nao_participantes', 'ugId', 'ugs', 'id')
            ->addIndex(['parametroId', 'ugId'], ['unique' => true])
            ->create();
    }
}
