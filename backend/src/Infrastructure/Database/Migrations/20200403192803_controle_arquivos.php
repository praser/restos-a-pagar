<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class ControleArquivos extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('controle_arquivos')
            ->addColumn('uuid', 'string', ['comment' => 'Identificador do arquivo', 'limit' => 255])
            ->addColumn('matricula', 'string', ['comment' => 'Matricula do usuário que enviou o arquivo', 'limit' => 7])
            ->addColumn('dataReferencia', 'date', ['comment' => 'Data de referência dos dados do arquivo'])
            ->addColumn('arquivo', 'string', ['comment'=> 'Nome do arquivo', 'limit' => '255'])
            ->addTimestamps()
            ->addIndex('uuid', ['unique' => true])
            ->save();
    }
}
