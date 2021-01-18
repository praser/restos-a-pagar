<?php

use Phinx\Migration\AbstractMigration;

class AtualizaSaldoNotaEmpenho extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('saldos_notas_empenhos')
            ->addColumn(
                'tipoResultadoPrimarioId',
                'integer',
                ['comment' => 'Id do tipo de resultado primário', 'after' => 'operacaoId']
            )
            ->addColumn(
                'ptres',
                'integer',
                ['comment' => 'Código PTRES da nota de empenho', 'after' => 'anoOrcamentario']
            )
            ->removeColumn('fonteRecurso')
            ->removeColumn('favorecidoCnpj')
            ->removeColumn('naturezaDespesaDetalhada')
            ->addForeignKeyWithName(
                'saldosNotasEmpenhosTipoResultadoPrimario',
                'tipoResultadoPrimarioId',
                'tipoResultadoPrimario',
                'id'
            )
            ->update();
    }
}
