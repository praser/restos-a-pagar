<?php

use Phinx\Migration\AbstractMigration;

class RemoveIxContaDesmenbradaPcasp extends AbstractMigration
{
    public function up(): void
    {
        $this
            ->table('pcasp')
            ->removeIndexByName('ix_conta_desmembrada_ano')
            ->update();
    }

    public function down(): void
    {
        $this
            ->table('pcasp')
            ->addIndex(['classe', 'grupo', 'subgrupo', 'titulo', 'subtitulo', 'item', 'subitem', 'ano'], ['name' => 'ix_conta_desmembrada_ano', 'unique' => true])
            ->update();
    }
}
