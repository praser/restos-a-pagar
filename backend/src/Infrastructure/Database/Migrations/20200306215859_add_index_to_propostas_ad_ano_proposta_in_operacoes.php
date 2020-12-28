<?php

use Phinx\Migration\AbstractMigration;

class AddIndexToPropostasAdAnoPropostaInOperacoes extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE UNIQUE NONCLUSTERED INDEX operacoes_proposta_anoProposta
            ON operacoes(proposta, anoProposta)
            WHERE proposta IS NOT NULL
            AND anoProposta IS NOT NULL;
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = 'DROP INDEX operacoes_proposta_anoProposta ON operacoes';
        $this->execute($query);
    }
}
