<?php

use Phinx\Migration\AbstractMigration;

class PlanoContasAplicadoSetorPublico extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('plano_contas_aplicado_setor_publico')
            ->addColumn('classe', 'integer', ['comment' => 'Classe da conta contábil'])
            ->addColumn('grupo', 'integer', ['comment' => 'Grupo da conta contábil'])
            ->addColumn('subgrupo', 'integer', ['comment' => 'Subgrupo da conta contábil'])
            ->addColumn('titulo', 'integer', ['comment' => 'Título da conta contábil'])
            ->addColumn('subtitulo', 'integer', ['comment' => 'Subtitulo da conta contábil'])
            ->addColumn('item', 'integer', ['comment' => 'Item da conta contábil'])
            ->addColumn('subitem', 'integer', ['comment' => 'Subitem da conta contábil'])
            ->addColumn('conta', 'integer', ['comment' => 'Número da conta contábil'])
            ->addColumn('tituloConta', 'string', ['limit' => 255, 'comment' => 'Título da conta contábil'])
            ->addColumn('funcao', 'string', ['limit' => 4000, 'comment' => 'Descrição da utilidade da conta contábil'])
            ->addColumn('naturezaSaldo', 'string', ['limit' => 10, 'comment' => 'Discriminação do tipo de saldo da conta contábil'])
            ->addColumn('ano', 'integer', ['comment' => 'Ano do PCASP - Plano de Contas Aplicado ao Setor Público'])
            ->addTimestamps()
            ->addIndex(['classe', 'grupo', 'subgrupo', 'titulo', 'subtitulo', 'item', 'subitem', 'ano'], ['name' => 'ix_conta_desmembrada_ano', 'unique' => true])
            ->addIndex(['conta', 'ano'], ['unique' => true, 'name' => 'ix_conta_ano'])
            ->create();
    }
}
