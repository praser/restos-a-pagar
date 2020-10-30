<?php

use Phinx\Migration\AbstractMigration;

class CreateVwEstatisticasBloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_estatisticas_bloqueio AS 
            WITH maxMonth AS (
                SELECT
                    dataReferencia,
                    year = YEAR(dataReferencia),
                    month = MONTH(dataReferencia),
                    monthRank = ROW_NUMBER() OVER (PARTITION BY YEAR(dataReferencia), MONTH(dataReferencia) ORDER BY dataReferencia DESC)
                FROM saldos_notas_empenhos
                GROUP BY dataReferencia
            )


            SELECT
                MAX(a.id) AS id
                ,c.ano AS anoExecucao
                ,a.anoOrcamentario
                ,a.dataReferencia AS data
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                ,COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes
                ,COUNT(DISTINCT a.documento) AS quantidadeDocumentos
                ,SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) AS saldoBloqueado
                ,ISNULL(SUM(g.saldo), 0) AS saldoDesbloqueado
                ,ISNULL(SUM(h.saldo), 0) AS saldoAguardandoDesbloqueio
                ,1 AS tipoInformacaoId
                ,'Todas as operações' tipoInformacaoDescricao
            FROM saldos_notas_empenhos AS a
            JOIN maxMonth b
            ON a.dataReferencia = b.dataReferencia
            AND b.monthRank = 1
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND c.classe = 6
            AND c.grupo = 3
            AND c.subgrupo = 1
            AND c.titulo = 5
            JOIN dbo.operacoes AS d
            ON a.operacaoId = d.id
            JOIN dbo.ugs e
            ON a.ugId = e.id
            LEFT JOIN lotes_desbloqueio AS f
            ON f.ano = c.ano
            LEFT JOIN lote_desbloqueio_operacoes AS g
            ON f.id = g.loteDesbloqueioId
            AND a.documento = g.documento
            AND g.desbloqueado = 1
            AND a.dataReferencia >= g.updated_at
            LEFT JOIN lote_desbloqueio_operacoes AS h
            ON f.id = h.loteDesbloqueioId
            AND a.documento = h.documento
            AND a.dataReferencia >= h.created_at
            AND (
                h.updated_at IS NULL 
                OR a.dataReferencia < h.updated_at
            )
            GROUP BY
                c.ano
                ,a.anoOrcamentario
                ,a.dataReferencia
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                
            UNION

            SELECT
                MAX(a.id) AS id
                ,c.ano AS anoExecucao
                ,a.anoOrcamentario
                ,a.dataReferencia AS data
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                ,COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes
                ,COUNT(DISTINCT a.documento) AS quantidadeDocumentos
                ,SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) AS saldoBloqueado
                ,ISNULL(SUM(g.saldo), 0) AS saldoDesbloqueado
                ,ISNULL(SUM(h.saldo), 0) AS saldoAguardandoDesbloqueio
                ,2 AS tipoInformacaoId
                ,'Operações que já cumpriram os critérios de desbloqueio' tipoInformacaoDescricao
            FROM saldos_notas_empenhos AS a
            JOIN maxMonth b
            ON a.dataReferencia = b.dataReferencia
            AND b.monthRank = 1
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND c.classe = 6
            AND c.grupo = 3
            AND c.subgrupo = 1
            AND c.titulo = 5
            JOIN dbo.operacoes AS d
            ON a.operacaoId = d.id
            AND d.dataCumprimentoCriteriosDesbloqueio IS NOT NULL
            JOIN dbo.ugs e
            ON a.ugId = e.id
            LEFT JOIN lotes_desbloqueio AS f
            ON f.ano = c.ano
            LEFT JOIN lote_desbloqueio_operacoes AS g
            ON f.id = g.loteDesbloqueioId
            AND a.documento = g.documento
            AND g.desbloqueado = 1
            AND a.dataReferencia >= g.updated_at
            LEFT JOIN lote_desbloqueio_operacoes AS h
            ON f.id = h.loteDesbloqueioId
            AND a.documento = h.documento
            AND a.dataReferencia >= h.created_at
            AND (
                h.updated_at IS NULL 
                OR a.dataReferencia < h.updated_at
            )
            GROUP BY
                c.ano
                ,a.anoOrcamentario
                ,a.dataReferencia
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                
            UNION
                
            SELECT
                MAX(a.id) AS id
                ,c.ano AS anoExecucao
                ,a.anoOrcamentario
                ,a.dataReferencia AS data
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                ,COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes
                ,COUNT(DISTINCT a.documento) AS quantidadeDocumentos
                ,SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) AS saldoBloqueado
                ,ISNULL(SUM(g.saldo), 0) AS saldoDesbloqueado
                ,ISNULL(SUM(h.saldo), 0) AS saldoAguardandoDesbloqueio
                ,3 AS tipoInformacaoId
                ,'Operações que ainda não cumpriram os critérios de desbloqueio' tipoInformacaoDescricao
            FROM saldos_notas_empenhos AS a
            JOIN maxMonth b
            ON a.dataReferencia = b.dataReferencia
            AND b.monthRank = 1
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND c.classe = 6
            AND c.grupo = 3
            AND c.subgrupo = 1
            AND c.titulo = 5
            JOIN dbo.operacoes AS d
            ON a.operacaoId = d.id
            AND d.dataCumprimentoCriteriosDesbloqueio IS NULL
            JOIN dbo.ugs e
            ON a.ugId = e.id
            LEFT JOIN lotes_desbloqueio AS f
            ON f.ano = c.ano
            LEFT JOIN lote_desbloqueio_operacoes AS g
            ON f.id = g.loteDesbloqueioId
            AND a.documento = g.documento
            AND g.desbloqueado = 1
            AND a.dataReferencia >= g.updated_at
            LEFT JOIN lote_desbloqueio_operacoes AS h
            ON f.id = h.loteDesbloqueioId
            AND a.documento = h.documento
            AND a.dataReferencia >= h.created_at
            AND (
                h.updated_at IS NULL 
                OR a.dataReferencia < h.updated_at
            )
            GROUP BY
                c.ano
                ,a.anoOrcamentario
                ,a.dataReferencia
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                
            UNION
                
            SELECT
                MAX(a.id) AS id
                ,c.ano AS anoExecucao
                ,a.anoOrcamentario
                ,a.dataReferencia AS data
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                ,COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes
                ,COUNT(DISTINCT a.documento) AS quantidadeDocumentos
                ,SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) AS saldoBloqueado
                ,ISNULL(SUM(g.saldo), 0) AS saldoDesbloqueado
                ,ISNULL(SUM(h.saldo), 0) AS saldoAguardandoDesbloqueio
                ,4 AS tipoInformacaoId
                ,'Operações que possuem saldo de empenho bloqueado' tipoInformacaoDescricao
            FROM saldos_notas_empenhos AS a
            JOIN maxMonth b
            ON a.dataReferencia = b.dataReferencia
            AND b.monthRank = 1
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND c.classe = 6
            AND c.grupo = 3
            AND c.subgrupo = 1
            AND c.titulo = 5
            JOIN dbo.operacoes AS d
            ON a.operacaoId = d.id
            JOIN dbo.ugs e
            ON a.ugId = e.id
            LEFT JOIN lotes_desbloqueio AS f
            ON f.ano = c.ano
            LEFT JOIN lote_desbloqueio_operacoes AS g
            ON f.id = g.loteDesbloqueioId
            AND a.documento = g.documento
            AND g.desbloqueado = 1
            AND a.dataReferencia >= g.updated_at
            LEFT JOIN lote_desbloqueio_operacoes AS h
            ON f.id = h.loteDesbloqueioId
            AND a.documento = h.documento
            AND a.dataReferencia >= h.created_at
            AND (
                h.updated_at IS NULL 
                OR a.dataReferencia < h.updated_at
            )
            GROUP BY
                c.ano
                ,a.anoOrcamentario
                ,a.dataReferencia
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
            HAVING SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) > 0

            UNION
                
            SELECT
                MAX(a.id) AS id
                ,c.ano AS anoExecucao
                ,a.anoOrcamentario
                ,a.dataReferencia AS data
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
                ,COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes
                ,COUNT(DISTINCT a.documento) AS quantidadeDocumentos
                ,SUM(a.saldoContaContabil) - ISNULL(SUM(g.saldo), 0) AS saldoBloqueado
                ,ISNULL(SUM(g.saldo), 0) AS saldoDesbloqueado
                ,ISNULL(SUM(h.saldo), 0) AS saldoAguardandoDesbloqueio
                ,4 AS tipoInformacaoId
                ,'Operações que possuem saldo de empenho que foi desbloqueado' tipoInformacaoDescricao
            FROM saldos_notas_empenhos AS a
            JOIN maxMonth b
            ON a.dataReferencia = b.dataReferencia
            AND b.monthRank = 1
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND c.classe = 6
            AND c.grupo = 3
            AND c.subgrupo = 1
            AND c.titulo = 5
            JOIN dbo.operacoes AS d
            ON a.operacaoId = d.id
            JOIN dbo.ugs e
            ON a.ugId = e.id
            LEFT JOIN lotes_desbloqueio AS f
            ON f.ano = c.ano
            LEFT JOIN lote_desbloqueio_operacoes AS g
            ON f.id = g.loteDesbloqueioId
            AND a.documento = g.documento
            AND g.desbloqueado = 1
            AND a.dataReferencia >= g.updated_at
            LEFT JOIN lote_desbloqueio_operacoes AS h
            ON f.id = h.loteDesbloqueioId
            AND a.documento = h.documento
            AND a.dataReferencia >= h.created_at
            AND (
                h.updated_at IS NULL 
                OR a.dataReferencia < h.updated_at
            )
            GROUP BY
                c.ano
                ,a.anoOrcamentario
                ,a.dataReferencia
                ,d.gigovId
                ,d.gigovNome
                ,e.siglaGestor
                ,e.nomeGestor
            HAVING ISNULL(SUM(g.saldo), 0) = 0
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_estatisticas_bloqueio');
    }
}
