<?php

use Phinx\Migration\AbstractMigration;

class AlterLoteDesbloqueioOperacoes extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('lote_desbloqueio_operacoes')
            ->renameColumn('responsavelRetorno', 'responsavelRetornoId')
            ->addColumn('responsavelRetornoNome', 'string', ['null' => true, 'comment' => 'Nome do responsável pela criação do lote de desbloqueio'])
            ->addColumn('responsavelRetornoUnidadeId', 'integer', ['null' => true, 'comment' => 'Código da unidade de lotação do responsável pela criação do lote de desbloqueio'])
            ->addColumn('responsavelRetornoUnidadeSigla', 'string', ['null' => true, 'comment' => 'Sigla da undiade de lotação do responsável pela criação do lote de desbloqueio'])
            ->update();
    }
}
