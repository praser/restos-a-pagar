<?php

use Phinx\Migration\AbstractMigration;

class AlterSnapshotEstatisticasBloqueio extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    addCustomColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Any other destructive changes will result in an error when trying to
     * rollback the migration.
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $this
            ->table('snapshot_estatisticas_bloqueio')
            ->renameColumn('quantidadeOperacoes', 'quantidadeOperacoesBloqueadas')
            ->renameColumn('quantidadeDocumentos', 'quantidadeDocumentosBloqueados')
            ->addColumn('quantidadeOperacoesAguardandoDesbloqueio', 'integer', ['comment' => 'Quantidade de operações que estão aguardando desbloqueio', 'default' => 0])
            ->addColumn('quantidadeDocumentosAguardandoDesbloqueio', 'integer', ['comment' => 'Quantidade de documentos que estão aguardando desbloqueio', 'default' => 0])
            ->addColumn('quantidadeOperacoesDesbloqueadas', 'integer', ['comment' => 'Quantidade de operações que já foram desbloqueados', 'default' => 0])
            ->addColumn('quantidadeDocumentosDesbloqueados', 'integer', ['comment' => 'Quantidade de documentos que já foram desbloqueados', 'default' => 0])
            ->update();
    }
}
