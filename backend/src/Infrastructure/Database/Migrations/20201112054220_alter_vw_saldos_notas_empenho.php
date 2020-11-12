<?php

use Phinx\Migration\AbstractMigration;

class AlterVwSaldosNotasEmpenho extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_saldos_notas_empenhos] AS
            SELECT
                a.*,
                c.operacao,
                c.proposta,
                c.convenio,
                c.aptaDesbloqueio
            FROM saldos_notas_empenhos a
            JOIN (
                SELECT
                    a.*
                FROM (
                    SELECT
                        pcaspId,
                        ugId,
                        operacaoId,
                        documento,
                        dataEmissao,
                        dataReferencia,
                        MAX(created_at) AS created_at
                    FROM saldos_notas_empenhos
                    GROUP BY pcaspId, ugId, operacaoId, documento, dataEmissao, dataReferencia
                ) a
                JOIN(
                    SELECT MAX(dataReferencia) AS dataReferencia FROM saldos_notas_empenhos
                ) b
                ON a.dataReferencia = b.dataReferencia
            ) b
            ON a.pcaspId = b.pcaspId
            AND a.ugId = b.ugId
            AND a.operacaoId = b.operacaoId
            AND a.documento = b.documento
            AND a.dataEmissao = b.dataEmissao
            AND a.created_at = b.created_at
            JOIN operacoes AS c
            ON b.operacaoId = c.id
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER VIEW [dbo].[vw_saldos_notas_empenhos] AS
            SELECT
                a.*
            FROM saldos_notas_empenhos a
            JOIN (
                SELECT
                    a.*
                FROM (
                    SELECT
                        pcaspId,
                        ugId,
                        operacaoId,
                        documento,
                        dataEmissao,
                        dataReferencia,
                        MAX(created_at) AS created_at
                    FROM saldos_notas_empenhos
                    GROUP BY pcaspId, ugId, operacaoId, documento, dataEmissao, dataReferencia
                ) a
                JOIN(
                    SELECT MAX(dataReferencia) AS dataReferencia FROM saldos_notas_empenhos
                ) b
                ON a.dataReferencia = b.dataReferencia
            ) b
            ON a.pcaspId = b.pcaspId
            AND a.ugId = b.ugId
            AND a.operacaoId = b.operacaoId
            AND a.documento = b.documento
            AND a.dataEmissao = b.dataEmissao
            AND a.created_at = b.created_at;
        SQL;

        $this->execute($query);
    }
}
