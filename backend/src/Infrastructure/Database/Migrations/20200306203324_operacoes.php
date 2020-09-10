<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class Operacoes extends AbstractMigration
{
    public function change(): void
    {
        $this->table('operacoes')
            ->addColumn('operacao', 'integer', ['comment' => 'Número da operacao na Caixa'])
            ->addColumn('dv', 'integer', ['comment' => 'Dv da operação na Caixa'])
            ->addColumn(
                'proposta',
                'integer',
                ['null' => true, 'comment' => 'Número da proposta no SICONV']
            )
            ->addColumn(
                'anoProposta',
                'integer',
                ['null' => true, 'comment' => 'Ano da proposta no SICONV']
            )
            ->addColumn(
                'convenio',
                'integer',
                ['null' => true, 'comment' => 'Número do convênio no SIAFI']
            )
            ->addColumn(
                'anoOrcamentario',
                'integer',
                ['null' => true, 'comment' => 'Ano da proposta no SICONV']
            )
            ->addTimestamps()
            ->addIndex(['operacao', 'dv'], ['unique' => true])
            ->create();
    }
}
