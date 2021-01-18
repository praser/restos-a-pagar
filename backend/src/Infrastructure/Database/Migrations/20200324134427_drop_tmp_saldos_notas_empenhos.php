<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class DropTmpSaldosNotasEmpenhos extends AbstractMigration
{
    public function change(): void
    {
        $this->table('tmp_arquivo_saldo_tesouro_gerencial')->drop()->update();
    }
}
