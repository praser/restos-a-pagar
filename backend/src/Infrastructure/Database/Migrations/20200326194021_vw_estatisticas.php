<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

class VwEstatisticas extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW [vw_estatisticas] AS
            WITH estatisticas_cte (
                id,
                data,
                quantidade_operacoes,
                quantidade_notas_empenho,
                saldo_notas_empenho,
                dias_ate_bloqueio,
                dias_ate_cancelamento,
                created_at,
                updated_at
            ) AS (
                SELECT
                    MIN(a.id) AS id,
                    CONVERT(DATE, a.created_at) AS data,
                    COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                    COUNT(a.id) AS quantidade_notas_empenho,
                    SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                    DATEDIFF(DAY, CONVERT(DATE, a.created_at), CONVERT(DATE, '2020-06-30')) AS dias_ate_bloqueio,
                    DATEDIFF(DAY, CONVERT(DATE, a.created_at), CONVERT(DATE, '2020-12-31')) AS dias_ate_cancelamento,
                    MAX(a.created_at) AS created_at,
                    MAX(a.updated_at) AS updated_at
                FROM saldos_notas_empenhos a
                JOIN pcasp AS b
                ON a.pcaspId = b.id
                JOIN ugs AS c
                ON a.ugId = c.id
                JOIN tipo_resultado_primario d
                ON a.tipoResultadoPrimarioId = d.id
                WHERE b.conta = 631100000
                AND a.anoOrcamentario = 2018
                AND c.codigo <> 250107
                AND d.idSiafi <> 6
                GROUP BY CONVERT(DATE, a.created_at)
            ) 
            SELECT
                a.*
            FROM estatisticas_cte a
            JOIN (
                SELECT
                    MAX(data) AS data
                FROM estatisticas_cte
                GROUP BY YEAR(DATA), MONTH(DATA)
            ) b
            ON a.data = b.data
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_estatisticas');
    }
}
