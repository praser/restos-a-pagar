<?php

use Phinx\Migration\AbstractMigration;

class CreateVwLiminarSaldoNotasEmpenhoBloqueadas extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_liminares_saldo_notas_empenho_bloqueadas AS
            SELECT
                e.*
            FROM liminares AS a
            JOIN dbo.liminar_operacoes AS b
            ON a.id = b.liminarId
            JOIN parametros AS c
            ON anoExecucao = (SELECT MAX(anoExecucao) FROM parametros)
            JOIN pcasp AS d
            ON c.anoExecucao = d.ano
            AND c.pcaspClasse = d.classe
            AND c.pcaspGrupo = d.grupo
            AND c.pcaspSubgrupo = d.subgrupo
            AND c.pcaspTituloBloqueio = d.titulo
            JOIN saldos_notas_empenhos AS e
            ON b.operacaoId = e.operacaoId
            AND e.dataReferencia = (SELECT MAX(dataReferencia) FROM saldos_notas_empenhos)
            AND e.pcaspId = d.id
        SQL;

        $this->execute($query);
    }
    
    public function down(): void
    {
        $this->execute('DROP VIEW vw_liminares_saldo_notas_empenho_bloqueadas');
    }
}
