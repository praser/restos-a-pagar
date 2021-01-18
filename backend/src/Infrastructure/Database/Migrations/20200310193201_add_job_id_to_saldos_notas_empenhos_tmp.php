<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class AddJobIdToSaldosNotasEmpenhosTmp extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_saldos_notas_empenhos')
            ->addColumn('jobId', 'integer', ['comment' => 'Id do Job que processou o registro', 'after' => 'id'])
            ->addForeignKeyWithName('job_tmp_saldos_notas_empenhos', 'jobId', 'jobs', 'id')
            ->update();
    }
}
