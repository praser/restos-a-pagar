<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class AddOperacaoFkToSaldosNotasEmpenhos extends AbstractMigration
{
    public function change(): void
    {
        $this->table('saldos_notas_empenhos')
            ->renameColumn('convenio', 'operacaoId')
            ->addForeignKeyWithName(
                'fk_operacao_saldo_nota_empenho',
                'operacaoId',
                'operacoes',
                'id'
            )
            ->update();

    }
}
