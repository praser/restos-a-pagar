<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class VwEstatisticasGestor extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW [dbo].[vw_estatisticas_gestor] AS
            WITH cte(
                id,
                siglaGestor,
                quantidade_operacoes,
                quantidade_notas_empenho,
                saldo_notas_empenho,
                created_at,
                updated_at
            ) AS (
                SELECT
                    ROW_NUMBER() OVER(ORDER BY saldo_notas_empenho DESC) AS id,
                    a.*
                FROM (
                    SELECT
                        c.siglaGestor AS siglaGestor,
                        COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                        COUNT(DISTINCT a.documento) AS quantidade_notas_empenho,
                        SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                        c.created_at,
                        c.created_at AS updated_at
                    FROM vw_saldos_notas_empenhos a
                    JOIN pcasp b
                    ON a.pcaspId = b.id
                    AND b.conta = 631100000
                    JOIN ugs c
                    ON a.ugId = c.id
                    AND c.codigo <> 250107
                    JOIN tipo_resultado_primario d
                    ON a.tipoResultadoPrimarioId = d.id
                    AND d.idSiafi <> 6
                    WHERE anoOrcamentario = 2018
                    GROUP BY c.siglaGestor, c.created_at
                ) a
            )
            
            SELECT
                a.id,
                a.siglaGestor,
                SUM(quantidade_operacoes) AS quantidade_operacoes,
                SUM(quantidade_notas_empenho) AS quantidade_notas_empenho,
                SUM(saldo_notas_empenho) AS saldo_notas_empenho,
                MAX(created_at) AS created_at,
                MAX(updated_at) AS updated_at
            FROM (
                SELECT
                    IIF(b.saldo_notas_empenho IS NULL, 0, a.id) AS id,
                    IIF(b.saldo_notas_empenho IS NULL, 'OUTROS', a.siglaGestor) AS siglaGestor,
                    quantidade_operacoes,
                    quantidade_notas_empenho,
                    a.saldo_notas_empenho,
                    created_at,
                    updated_at
                FROM cte a
                LEFT JOIN (
                    SELECT TOP 5
                        saldo_notas_empenho
                    FROM cte
                    ORDER BY 1 DESC
                ) b
                ON a.saldo_notas_empenho = b.saldo_notas_empenho
            ) a
            GROUP BY a.id, a.siglaGestor
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_estatisticas_gestor');
    }
}
