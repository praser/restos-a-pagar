<?php

use Phinx\Migration\AbstractMigration;

class CreateLotesDesbloqueioOperacoes extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('lote_desbloqueio_operacoes')
            ->addColumn('loteDesbloqueioId', 'integer', ['comment' => 'Id do lote de desbloqueio'])
            ->addColumn('operacaoId', 'integer', ['comment' => 'Id da operação'])
            ->addColumn('documento', 'string', ['limit' => 255, 'comment' => 'Número da nota de empenho'])
            ->addColumn('saldo', 'decimal', ['precision' => 18, 'scale' => 2, 'comment' => 'Saldo a ser desbloqueado'])
            ->addColumn('desbloqueado', 'boolean', ['null' => true, 'comment' => 'Flag indicando se houve o desbloqueio dos empenhos da operação'])
            ->addColumn('responsavelRetorno', 'string', ['limit' => 7, 'null' => true, 'comment' => 'Matrícula do empregado responsável pelo retorno'])
            ->addTimestamps()
            ->addForeignKeyWithName('fk_lote_desbloqueio', 'loteDesbloqueioId', 'lotes_desbloqueio', 'id')
            ->addForeignKeyWithName('fk_operacao', 'operacaoId', 'operacoes', 'id')
            ->create();
    }
}
