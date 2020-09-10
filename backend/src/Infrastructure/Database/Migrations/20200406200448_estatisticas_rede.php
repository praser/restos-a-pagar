<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class EstatisticasRede extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_estatisticas_rede AS
            WITH estatisticas_cte ( id, data, gigovId, gigovNome, quantidade_operacoes, quantidade_notas_empenho, saldo_notas_empenho, dias_ate_bloqueio, dias_ate_cancelamento, created_at, updated_at) AS (
                SELECT
                    MIN(a.id) AS id,
                    CONVERT(DATE, a.dataReferencia) AS data,
                    e.gigovId,
                    e.gigovNome,
                    COUNT(DISTINCT a.operacaoId) AS quantidade_operacoes,
                    COUNT(a.id) AS quantidade_notas_empenho,
                    SUM(a.saldoContaContabil) AS saldo_notas_empenho,
                    DATEDIFF(DAY, CONVERT(DATE, a.dataReferencia), CONVERT(DATE, '2020-06-30')) AS dias_ate_bloqueio,
                    DATEDIFF(DAY, CONVERT(DATE, a.dataReferencia), CONVERT(DATE, '2020-12-31')) AS dias_ate_cancelamento,
                    MAX(a.created_at) AS created_at,
                    MAX(a.updated_at) AS updated_at
                FROM dbo.saldos_notas_empenhos a
                JOIN dbo.pcasp AS b
                ON a.pcaspId = b.id
                JOIN dbo.ugs AS c
                ON a.ugId = c.id
                JOIN dbo.tipo_resultado_primario d
                ON a.tipoResultadoPrimarioId = d.id
                JOIN dbo.operacoes e
                ON a.operacaoId = e.id
                WHERE b.conta = 631100000
                AND a.anoOrcamentario = 2018
                AND c.codigo <> 250107
                AND d.idSiafi <> 6
                GROUP BY a.dataReferencia, gigovId, gigovNome
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
            ON a.data = b.data;
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_estatisticas_rede');
    }
}
