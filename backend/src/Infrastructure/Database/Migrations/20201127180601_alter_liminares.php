<?php

use Phinx\Migration\AbstractMigration;

class AlterLiminares extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('liminares')
            ->addColumn('dataAteste', 'datetime', ['comment' => 'Data em que o atesta da decisão foi dada por um empregado caxia', 'null' => true])
            ->addColumn('responsavelFimVigenciaId', 'string', ['comment' => 'Matrícula do responsável pelo cadastramento do fim da vigência da liminar', 'limit' => 7, 'null' => true])
            ->addColumn('responsavelFimVigenciaNome', 'string', ['comment' => 'Nome do responsável pelo cadastramento do fim da vigência da liminarr', 'null' => true])
            ->addColumn('responsavelFimVigenciaUnidadeId', 'integer', ['comment' => 'Id da unidade de lotação física do responsável pelo cadastramento do fim da vigência da liminar', 'null' => true])
            ->addColumn('responsavelFimVigenciaUnidadeSigla', 'string', ['comment' => 'Sigla da unidade de lotação física do responsável pelo cadastramento do fim da vigência da liminar', 'null' => true])
            ->update();
    }
}
