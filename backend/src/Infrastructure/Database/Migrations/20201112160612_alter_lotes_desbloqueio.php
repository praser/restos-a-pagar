<?php

use Phinx\Migration\AbstractMigration;

class AlterLotesDesbloqueio extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('lotes_desbloqueio')
            ->renameColumn('responsavel', 'responsavelId')
            ->addColumn('responsavelNome', 'string', ['comment' => 'Nome do responsável pela criação do lote de desbloqueio'])
            ->addColumn('responsavelUnidadeId', 'integer', ['comment' => 'Código da unidade de lotação do responsável pela criação do lote de desbloqueio'])
            ->addColumn('responsavelUnidadeSigla', 'string', ['comment' => 'Sigla da undiade de lotação do responsável pela criação do lote de desbloqueio'])
            ->update();
    }
}
