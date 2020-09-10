<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class AtualizaSaldosNotasEmpenhosTmp extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_saldos_notas_empenhos')
            ->addColumn('ptres', 'string', [
                'comment' => 'Número do PTRES da nota de empenho',
                'limit'=> 4000,
                'null' => true
            ])
            ->addColumn('resultadoPrimarioId', 'string', [
                'comment' => 'Id do resultado primário no siconv',
                'limit'=> 4000,
                'null' => true
            ])
            ->addColumn('resultadoPrimarioDescricao', 'string', [
                'comment' => 'Descricao do resultado primário no siconv',
                'limit'=> 4000,
                'null' => true
            ])
            ->removeColumn('fonteRecurso')
            ->removeColumn('favorecidoCnpj')
            ->removeColumn('naturezaDespesaDetalhada')
            ->update();
    }
}
