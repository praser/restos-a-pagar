<?php

use Phinx\Migration\AbstractMigration;

class TipoResultadoPrimario extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tipoResultadoPrimario')
            ->addColumn('idSiafi', 'integer', ['comment' => 'ID do tipo de resultado primário no SIAFI'])
            ->addColumn('descricao', 'string', ['comment' => 'Descrição do tipo de resultado primário'])
            ->create();
    }
}
