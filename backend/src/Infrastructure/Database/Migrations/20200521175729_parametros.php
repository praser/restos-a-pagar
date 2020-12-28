<?php

use Phinx\Migration\AbstractMigration;

class Parametros extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('parametros')
            ->addColumn('anoExecucao', 'integer', ['comment' => 'Ano em que o RAP será executado'])
            ->addColumn('anoOrcamentario', 'integer', ['comment' => 'Ano orçamentário que será alvo do RAP'])
            ->addColumn('rpNaoProcessadosALiquidarPcaspId', 'integer', ['comment' =>'Id da subconta do PCASP que armazena o saldo dos restos a pagar não processados a liquidar'])
            ->addColumn('rpNaoProcessadosBloqueadosPcaspId', 'integer', ['comment' => 'Id da subconta do PCASP que armazena o saldo dos restos a pagar não processados bloqueados'])
            ->addColumn('rpNaoProcessadosCanceladosPcaspId', 'integer', ['comment' => 'Id da subconta do PCASP que armazena o saldo dos restos a pagar não processados cancelados'])
            ->addColumn('saudeUgId', 'integer', ['comment' => 'Id da UG do ministério da Saúde'])
            ->addColumn('orcamentoImpositivoTipoResultadoPrimarioId', 'integer', ['comment' => 'Id do tipo de resultado primário do orçamento impositivo individal'])
            ->addColumn('dataBloqueio', 'date', ['comment' => 'Data em que ocorrerá o bloqueio dos restos a pagar não processados a liquidar'])
            ->addColumn('dataCancelamento', 'date', ['comment' => 'Data em que ocorrerá o cancelamento dos restos a pagar não processados bloqueados'])
            ->addTimestamps()
            ->addForeignKeyWithName('parametrosRpNaoProcessadosALiquidarPcaspFk', 'rpNaoProcessadosALiquidarPcaspId', 'pcasp', 'id')
            ->addForeignKeyWithName('parametrosRpNaoProcessadosBloqueadosPcaspFk', 'rpNaoProcessadosBloqueadosPcaspId', 'pcasp', 'id')
            ->addForeignKeyWithName('parametrosRpNaoProcessadosCanceladosPcaspFk', 'rpNaoProcessadosCanceladosPcaspId', 'pcasp', 'id')
            ->addForeignKeyWithName('parametrosSaudeUgFk', 'saudeUgId', 'ugs', 'id')
            ->addForeignKeyWithName('parametrosOrcamentoImpositivoTipoResultadoPrimarioIdFk', 'orcamentoImpositivoTipoResultadoPrimarioId', 'tipo_resultado_primario', 'id')
            ->create();
    }
}
