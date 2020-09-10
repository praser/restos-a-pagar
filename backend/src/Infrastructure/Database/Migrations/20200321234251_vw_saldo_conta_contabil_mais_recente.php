<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class VwSaldoContaContabilMaisRecente extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_saldos_notas_empenhos AS
            SELECT
                a.*
            FROM saldos_notas_empenhos a
            JOIN (
                SELECT
                    pcaspId,
                    ugId,
                    operacaoId,
                    documento,
                    dataEmissao,
                    max(created_at) AS created_at
                FROM dbo.saldos_notas_empenhos
                GROUP BY pcaspId, ugId, operacaoId, documento, dataEmissao
            ) b
            ON a.pcaspId = b.pcaspId
            AND a.ugId = b.ugId
            AND a.operacaoId = b.operacaoId
            AND a.documento = b.documento
            AND a.dataEmissao = b.dataEmissao
            AND a.created_at = b.created_at
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_saldos_notas_empenhos');
    }
}
