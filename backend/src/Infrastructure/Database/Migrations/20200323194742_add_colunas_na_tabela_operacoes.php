<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class AddColunasNaTabelaOperacoes extends AbstractMigration
{
    public function change(): void
    {
        $this->table('operacoes')
            ->addColumn('gigovId', 'integer', ['null' => true])
            ->addColumn('gigovNome', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('proponente', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('uf', 'string', ['limit' => 2, 'null' => true])
            ->addColumn('siglaGestor', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('enquadramentoLegislacao', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('enquadramentoLegislacaoComplemento', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('situacaoContrato', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('situacaoContratoComplemento', 'string', ['limit' => 255, 'null' => true])
            ->addColumn('percentualFisicoAferido', 'decimal', ['precision' => 5, 'scale' => 2, 'null' => true])
            ->addColumn('percentualFinanceiroDesbloqueado', 'decimal', ['precision' => 5, 'scale' => 2, 'null' => true])
            ->addColumn('dataVigencia', 'date', ['null' => true])
            ->addColumn('dataSPA', 'date', ['null' => true])
            ->addColumn('dataVRPL', 'date', ['null' => true])
            ->addColumn('dataAIO', 'date', ['null' => true])
            ->addColumn('valorRepasse', 'decimal', ['precision' => 18, 'scale' => 2, 'null' => true])
            ->addColumn('objeto', 'string', ['limit' => 4000, 'null' => true])
            ->update();
    }
}
