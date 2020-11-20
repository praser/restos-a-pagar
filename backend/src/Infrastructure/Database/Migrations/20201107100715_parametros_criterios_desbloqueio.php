<?php

use Phinx\Migration\AbstractMigration;

class ParametrosCriteriosDesbloqueio extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('parametros_criterios_desbloqueio')
            ->addColumn('parametroId', 'integer', ['comment' => 'id da tabela parametros'])
            ->addColumn('query', 'string', ['limit' => '4000', 'comment' => 'Consulta SQL que retorna o número da operação e a data do cumprimento do critério de desbloqueio'])
            ->addColumn('inicioVigencia', 'date', ['comment' => 'Data em que o critério passou a ter validade'])
            ->addColumn('fimVigencia', 'date', ['null' => true, 'comment' => 'Data em que o critério deixou de ter validade'])
            ->addColumn('responsavelId', 'string', ['limit' => 7, 'comment' => 'Matrícula do responsável pelo cadastramento do criteério'])
            ->addColumn('responsavelNome', 'string', ['comment' => 'Nome do responsável pelo cadastramento do critério'])
            ->addColumn('responsavelUnidadeId', 'integer', ['comment' => 'Código da unidade de lotação física no responsável pelo cadastramento do critério na data do cadastramento'])
            ->addColumn('responsavelUnidadeSigla', 'string', ['comment' => 'Sigla da unidade de lotação física no responsável pelo cadastramento do critério na data do cadastramento'])
            ->addTimestamps()
            ->addForeignKeyWithName('fk_parametros_parametros_criterios_desbloqueio', 'parametroId', 'parametros')
            ->addIndex(['parametroId', 'inicioVigencia'], ['unique' => true])
            ->addIndex(['parametroId', 'fimVigencia'], ['unique' => true])
            ->addIndex(['parametroId', 'query'], ['unique' => true])
            ->save();
    }
}
