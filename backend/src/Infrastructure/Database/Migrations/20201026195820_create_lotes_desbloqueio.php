<?php

use Phinx\Migration\AbstractMigration;

class CreateLotesDesbloqueio extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('lotes_desbloqueio')
            ->addColumn('sequencial', 'integer', ['comment' => 'Número do lote de envio da solicitação de desbloqueio'])
            ->addColumn('ano', 'integer', ['comment' => 'Ano em que o lote foi gerado'])
            ->addColumn('ce', 'string', ['limit' => 255, 'comment' => 'Número da comunicação eletrônica enviada para informar a disponibilização do lote de desbloqueio'])
            ->addColumn('responsavel', 'string', ['limit' => 7, 'comment' => 'Matrícula de quem gerou o lote de desbloqueio'])
            ->addColumn('situacao', 'string', ['limit' => 255, 'comment' => 'Situação da solicitação de desbloqueio'])
            ->addTimestamps()
            ->addIndex(['sequencial', 'ano'], ['unique' => true, 'name' => 'ix_sequencial_ano'])
            ->addIndex(['ce'], ['unique' => true, 'name' => 'ix_ce'])
            ->create();
    }
}
