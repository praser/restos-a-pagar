<?php

use Phinx\Migration\AbstractMigration;

class CreateParametros extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('parametros')
            ->addColumn('anoExecucao', 'integer', ['comment' => 'Ano em que o RAP será executado'])
            ->addColumn('anoOrcamentario', 'integer', ['comment' => 'Ano orçamentário que será alvo do RAP'])
            ->addColumn('pcaspClasse', 'integer', ['comment' =>'Código da classe dos restos a pagar no pcasp'])
            ->addColumn('pcaspGrupo', 'integer', ['comment' => 'Código do grupo dos restos a pagar no pcasp'])
            ->addColumn('pcaspSubgrupo', 'integer', ['comment' => 'Código do subgrupo dos restos a pagar no pcasp'])
            ->addColumn('pcaspTituloPreBloqueio', 'integer', ['comment' => 'Código do título das subcontas dos restoas a pagar não processados e não liquidados'])
            ->addColumn('pcaspTituloBloqueio', 'integer', ['comment' => 'Código do título das subcontas dos restoas a pagar bloqueados'])
            ->addColumn('pcaspTituloCancelamento', 'integer', ['comment' => 'Código do título das subcontas dos restoas a pagar cancelados'])
            ->addColumn('dataBloqueio', 'date', ['comment' => 'Data em que ocorrerá o bloqueio dos restos a pagar não processados a liquidar'])
            ->addColumn('dataCancelamento', 'date', ['comment' => 'Data em que ocorrerá o cancelamento dos restos a pagar não processados bloqueados'])
            ->addTimestamps()
            ->addIndex(['anoExecucao'], ['unique' => true])
            ->addIndex(['anoOrcamentario'], ['unique' => true])
            ->create();
    }
}
