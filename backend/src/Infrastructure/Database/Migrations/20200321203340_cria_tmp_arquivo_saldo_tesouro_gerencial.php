<?php

use Phinx\Migration\AbstractMigration;

class CriaTmpArquivoSaldoTesouroGerencial extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_arquivo_saldo_tesouro_gerencial')
            ->addColumn('pcaspConta', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna pcaspConta do arquivo do tesouro gerencial'])
            ->addColumn('ugCodigo', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna ugCodigo do arquivo do tesouro gerencial'])
            ->addColumn('convenio', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna convenio do arquivo do tesouro gerencial'])
            ->addColumn('operacao', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna operacao do arquivo do tesouro gerencial'])
            ->addColumn('ptres', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna ptres do arquivo do tesouro gerencial'])
            ->addColumn('tipoResultadoPrimarioId', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna tipoResultadoPrimarioId do arquivo do tesouro gerencial'])
            ->addColumn('tipoResultadoPrimarioDescricao', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna tipoResultadoPrimarioDescricao do arquivo do tesouro gerencial'])
            ->addColumn('anoOrcamentario', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna anoOrcamentario do arquivo do tesouro gerencial'])
            ->addColumn('documento', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna documento do arquivo do tesouro gerencial'])
            ->addColumn('dataEmissao', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna dataEmissao do arquivo do tesouro gerencial'])
            ->addColumn('saldoContaContabil', 'string', ['limit' => 4000, 'comment' => 'Armazena o valor da coluna saldoContaContabil do arquivo do tesouro gerencial'])
            ->save();
    }
}
