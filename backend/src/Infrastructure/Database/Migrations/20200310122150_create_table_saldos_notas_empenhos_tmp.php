<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class CreateTableSaldosNotasEmpenhosTmp extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_saldos_notas_empenhos')
            ->addColumn('pcaspId', 'string', [
                'comment' => 'Id da conta do Plano de Contas Aplicadas ao Setor Público',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('ugId', 'string', [
                'comment' => 'Id da UG executora da nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('operacaoId', 'string', [
                'comment' => 'Número do convênio SIAFI ao qual a nota de empenho pertence',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('anoOrcamentario', 'string', [
                'comment' => 'Ano orçamentário em que a nota de empenho foi emitida',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('documento', 'string', [
                'comment' => 'Número do documente referente a nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('fonteRecurso', 'string', [
                'comment' => 'Fonte de recurso da nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('favorecidoCnpj', 'string', [
                'comment' => 'CNPJ do favorecido pela nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('dataEmissao', 'string', [
                'comment' => 'data de emissão da nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('naturezaDespesaDetalhada', 'string', [
                'comment' => 'Natureza de despesa da nota de empenho',
                'limit' => 4000,
                'null' => true,
            ])
            ->addColumn('saldoContaContabil', 'string', [
                'comment' => 'Saldo da nota de empenho na referida conta contábil',
                'limit' => 4000,
                'null' => true,
            ])
            ->addTimestamps()
            ->create();
    }
}
