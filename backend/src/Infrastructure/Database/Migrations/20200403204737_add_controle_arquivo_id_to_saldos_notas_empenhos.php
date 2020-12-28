<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class AddControleArquivoIdToSaldosNotasEmpenhos extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('saldos_notas_empenhos')
            ->addColumn('controleArquivoId', 'integer', ['comment' => 'Id da tabela de controle de arquivos', 'null' => true])
            ->addColumn('dataReferencia', 'date', ['comment' => 'Data da posição do saldo', 'null' => true])
            ->addForeignKey('controleArquivoId', 'controle_arquivos', 'id')
            ->update();
    }
}
