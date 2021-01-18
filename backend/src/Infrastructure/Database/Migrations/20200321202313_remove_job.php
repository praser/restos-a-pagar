<?php

use Phinx\Migration\AbstractMigration;

class RemoveJob extends AbstractMigration
{
    public function change(): void
    {
        $this
            ->table('tmp_saldos_notas_empenhos')
            ->dropForeignKey('jobId')
            ->removeColumn('jobId')
            ->update();

        $this->execute('DROP VIEW vw_job_progress');

        $this->table('jobs')->drop()->update();
    }
}
