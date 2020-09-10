<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class SaldosNotasEmpenhos extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('saldos_notas_empenhos')
            ->addColumn('pcaspId', 'integer', ['comment' => 'Id da conta do Plano de Contas Aplicadas ao Setor Público'])
            ->addColumn('ugId', 'integer', ['comment' => 'Id da UG executora da nota de empenho'])
            ->addColumn('convenio', 'integer', ['comment' => 'Número do convênio SIAFI ao qual a nota de empenho pertence'])
            ->addColumn('anoOrcamentario', 'integer', ['comment' => 'Ano orçamentário em que a nota de empenho foi emitida'])
            ->addColumn('documento', 'string', ['limit' => 255, 'comment' => 'Número do documente referente a nota de empenho'])
            ->addColumn('fonteRecurso', 'integer', ['comment' => 'Fonte de recurso da nota de empenho'])
            ->addColumn('favorecidoCnpj', 'biginteger', ['comment' => 'CNPJ do favorecido pela nota de empenho'])
            ->addColumn('dataEmissao', 'date', ['comment' => 'data de emissão da nota de empenho'])
            ->addColumn('naturezaDespesaDetalhada', 'integer', ['comment' => 'Natureza de despesa da nota de empenho'])
            ->addColumn('saldoContaContabil', 'decimal', ['precision' => 18, 'scale' => 2, 'comment' => 'Saldo da nota de empenho na referida conta contábil'])
            ->addTimestamps()
            ->addForeignKeyWithName('fk_pcasp', 'pcaspId', 'pcasp', 'id')
            ->addForeignKeyWithName('fk_ug', 'ugId', 'ugs', 'id')
            ->create();
    }
}
