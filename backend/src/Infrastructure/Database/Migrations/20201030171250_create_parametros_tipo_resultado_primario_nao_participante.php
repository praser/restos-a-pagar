<?php

use Phinx\Migration\AbstractMigration;

class CreateParametrosTipoResultadoPrimarioNaoParticipante extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('parametros_tipo_resultado_primario_nao_participante')
            ->addColumn('parametroId', 'integer', ['comment' => 'Id da tabela parametros'])
            ->addColumn('tipoResultadoPrimarioId', 'integer', ['comment' => 'Id da tabela tipo_resultado_primario'])
            ->addForeignKeyWithName('fk_parametros_parametros_tipo_resultado_primario', 'parametroId', 'parametros')
            ->addForeignKeyWithName('fk_tipo_resultado_primario_parametros_tipo_resultado_primario', 'tipoResultadoPrimarioId', 'tipo_resultado_primario')
            ->addIndex(['parametroId', 'tipoResultadoPrimarioId'], ['unique' => true])
            ->create();
    }
}
