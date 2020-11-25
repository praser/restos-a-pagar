<?php

use Phinx\Migration\AbstractMigration;

class SnapshotEstatisticasBloqueio extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('snapshot_estatisticas_bloqueio')
            ->addColumn('anoExecucao', 'integer', ['comment' => 'Ano de execução da estatística'])
            ->addColumn('anoOrcamentario', 'integer', ['comment' => 'Ano orçamentário da estatística'])
            ->addColumn('data', 'date', ['comment' => 'Data de referência da estatística'])
            ->addColumn('gigovId', 'integer', ['comment' => 'Id da GIGOV que responde pela execução das operações que geraram a estatística'])
            ->addColumn('gigovNome', 'string', ['comment' => 'Id da GIGOV que responde pela execução das operações que geraram a estatística'])
            ->addColumn('siglaGestor', 'string', ['comment' => 'Sigla do gestor que agrupa a estatística'])
            ->addColumn('nomeGestor', 'string', ['comment' => 'Nome do gestor que agrupa a estatística'])
            ->addColumn('quantidadeOperacoes', 'integer', ['comment' => 'Quantidade de operações que tiveram saldo bloqueado'])
            ->addColumn('quantidadeDocumentos', 'integer', ['comment' => 'Quantidade de notas de empenho que tiveram saldo bloqueado'])
            ->addColumn('saldoBloqueado', 'float', ['comment' => 'Somatório do saldo bloqueado'])
            ->addColumn('saldoDesbloqueado', 'float', ['comment' => 'Somatório do saldo desbloqueado'])
            ->addColumn('saldoAguardandoDesbloqueio', 'float', ['comment' => 'Somatório do saldo que teve o desbloqueio solicitado e aidanda não foi processado'])
            ->addColumn('tipoInformacaoId', 'integer', ['comment' => 'Id do tipo de informação'])
            ->addColumn('tipoInformacaoDescricao', 'string', ['comment' => 'Descrição do tipo de informação'])
            ->create();
    }
}
