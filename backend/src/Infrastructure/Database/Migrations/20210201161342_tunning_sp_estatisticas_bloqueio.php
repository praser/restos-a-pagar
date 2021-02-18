<?php

use Phinx\Migration\AbstractMigration;

class TunningSpEstatisticasBloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER PROCEDURE [dbo].[SP_ESTATISTICAS_BLOQUEIO]
                @anoExecucao AS INT,
                @tipoInformacao AS INT,
                @unidadeId AS INT,
                @siglaGestor AS VARCHAR(10)
            AS
            DECLARE @datas AS TABLE(data DATE, dataReferencia DATE);
            DECLARE @bloqueios AS TABLE(dataReferencia DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldoBloqueado FLOAT);
            DECLARE @solicitacoes AS TABLE(data DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldo FLOAT);
            DECLARE @desbloqueios AS TABLE(data DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldo FLOAT);
            INSERT INTO @datas
            SELECT * FROM cache.calendario
            INSERT INTO @bloqueios
            SELECT
                a.dataReferencia,
                COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                COUNT(*) AS quantidadeDocumentos,
                SUM(a.saldoContaContabil) AS saldoBloqueado
            FROM saldos_notas_empenhos AS a
            JOIN parametros AS b
            ON YEAR(a.dataReferencia) = b.anoExecucao
            AND a.dataReferencia >= b.dataBloqueio
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND b.anoExecucao = c.ano
            AND b.pcaspClasse = c.classe
            AND b.pcaspGrupo = c.grupo
            AND b.pcaspSubgrupo = c.subgrupo
            AND	b.pcaspTituloBloqueio = c.titulo
            JOIN operacoes AS d
            ON a.operacaoId = d.id
            AND d.situacaoContrato = 'CONTRATADA'
            JOIN ugs AS e
            ON e.id = a.ugId
            JOIN ministerios AS f
            ON e.ministerioId = f.id
            WHERE (
                (@unidadeId IS NULL AND gigovId IS NOT NULL)
                OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
            )
            AND (
                (@siglaGestor IS NULL AND sigla IS NOT NULL)
                OR (@siglaGestor IS NOT NULL AND f.sigla = @siglaGestor)
            )
            AND YEAR(a.dataReferencia) = @anoExecucao
            AND (
                (@tipoInformacao = 1 AND d.aptaDesbloqueio IS NOT NULL)
                OR (@tipoInformacao = 2 AND d.aptaDesbloqueio = 1)
                OR (@tipoInformacao = 3 AND d.aptaDesbloqueio = 0)
            )
            GROUP BY
                a.dataReferencia
            INSERT INTO @solicitacoes
            SELECT 
                dataSolicitacao,
                SUM(quantidadeOperacoes) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeOperacoes,
                SUM(quantidadeDocumentos) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeDocumentos,
                SUM(saldo) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS saldo
            FROM (
                SELECT
                    CONVERT(DATE, a.created_at) AS dataSolicitacao,
                    COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                    COUNT(*) AS quantidadeDocumentos,
                    SUM(saldo) AS saldo
                FROM lote_desbloqueio_operacoes AS a
                JOIN parametros AS b
                ON YEAR(a.created_at) = b.anoExecucao
                JOIN saldos_notas_empenhos AS c
                ON a.operacaoId = c.operacaoId
                AND a.documento = c.documento
                AND b.dataBloqueio = c.dataReferencia
                JOIN pcasp AS d
                ON b.anoExecucao = d.ano
                AND b.pcaspClasse = d.classe
                AND b.pcaspGrupo = d.grupo
                AND b.pcaspSubgrupo = d.subgrupo
                AND b.pcaspTituloBloqueio = d.titulo
                AND c.pcaspId = d.id
                JOIN operacoes AS e
                ON a.operacaoId = e.id
                JOIN ugs AS f
                ON c.ugId = f.id
                JOIN ministerios AS g
                ON f.ministerioId = g.id
                WHERE (
                    (@unidadeId IS NULL AND gigovId IS NOT NULL)
                    OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
                )
                AND (
                    (@siglaGestor IS NULL AND sigla IS NOT NULL)
                    OR (@siglaGestor IS NOT NULL AND g.sigla = @siglaGestor)
                )
                AND YEAR(a.created_at) = @anoExecucao
                AND (
                    (@tipoInformacao = 1 AND e.aptaDesbloqueio IS NOT NULL)
                    OR (@tipoInformacao = 2 AND e.aptaDesbloqueio = 1)
                    OR (@tipoInformacao = 3 AND e.aptaDesbloqueio = 0)
                )
                GROUP BY
                    CONVERT(DATE, a.created_at)
            ) AS a
            INSERT INTO @desbloqueios
            SELECT 
                a.dataDesbloqueio,
                b.quantidadeOperacoes,
                SUM(quantidadeDocumentos) OVER (ORDER BY a.dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeDocumentos,
                SUM(saldo) OVER (ORDER BY a.dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS saldo
            FROM (
                SELECT
                    CONVERT(DATE, a.updated_at) AS dataDesbloqueio,
                    COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                    COUNT(*) AS quantidadeDocumentos,
                    SUM(a.saldo) AS saldo
                FROM lote_desbloqueio_operacoes AS a
                JOIN parametros AS b
                ON YEAR(a.created_at) = b.anoExecucao
                JOIN saldos_notas_empenhos AS c
                ON a.operacaoId = c.operacaoId
                AND a.documento = c.documento
                AND b.dataBloqueio = c.dataReferencia
                JOIN pcasp AS d
                ON b.anoExecucao = d.ano
                AND b.pcaspClasse = d.classe
                AND b.pcaspGrupo = d.grupo
                AND b.pcaspSubgrupo = d.subgrupo
                AND b.pcaspTituloBloqueio = d.titulo
                AND c.pcaspId = d.id
                JOIN operacoes AS e
                ON a.operacaoId = e.id
                JOIN ugs AS f
                ON c.ugId = f.id
                JOIN ministerios AS g
                ON f.ministerioId = g.id
                WHERE a.desbloqueado = 1
                AND (
                    (
                        (@unidadeId IS NULL AND gigovId IS NOT NULL)
                        OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
                    )
                    AND (
                        (@siglaGestor IS NULL AND sigla IS NOT NULL)
                        OR (@siglaGestor IS NOT NULL AND g.sigla = @siglaGestor)
                    )
                    AND YEAR(a.updated_at) = @anoExecucao
                    AND (
                        (@tipoInformacao = 1 AND e.aptaDesbloqueio IS NOT NULL)
                        OR (@tipoInformacao = 2 AND e.aptaDesbloqueio = 1)
                        OR (@tipoInformacao = 3 AND e.aptaDesbloqueio = 0)
                    )
                )
                GROUP BY
                    CONVERT(DATE, a.updated_at)
            ) AS a
            LEFT JOIN (
                SELECT
                    dataDesbloqueio,
                    SUM(quantidadeOperacoes) OVER (ORDER BY dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeOperacoes
                FROM (
                    SELECT
                        updated_at as dataDesbloqueio,
                        count(*) as quantidadeOperacoes
                    FROM (
                        SELECT
                            operacaoId,
                            CONVERT(DATE, min(updated_at)) as updated_at
                        FROM
                            dbo.lote_desbloqueio_operacoes 
                        GROUP BY operacaoId
                    ) as h0
                    GROUP BY updated_at
                ) as h
            ) as b
            ON a.dataDesbloqueio = b.dataDesbloqueio
            SELECT
                id,
                anoExecucao,
                anoOrcamentario,
                data,
                gigovId,
                gigovNome,
                siglaGestor,
                nomeGestor,
                quantidadeOperacoes AS quantidadeOperacoesBloqueadas,
                quantidadeDocumentos AS quantidadeDocumentosBloqueados,
                saldoBloqueado,
                quantidadeOperacoesSolicitado - quantidadeOperacoesDesbloqueadas AS quantidadeOperacoesAguardandoDesbloqueio,
                quantidadeDocumentosSolicitado - quantidadeDocumentosDesbloqueados AS quantidadeDocumentosAguardandoDesbloqueio,
                saldoDesbloqueioSolicitado - saldoDesbloqueado AS saldoAguardandoDesbloqueio,
                quantidadeOperacoesDesbloqueadas,
                quantidadeDocumentosDesbloqueados,
                saldoDesbloqueado,
                tipoInformacaoId,
                tipoInformacaoDescricao
            FROM (
                SELECT
                    ROW_NUMBER() OVER (ORDER BY a.data) AS id,
                    c.anoExecucao,
                    c.anoOrcamentario,
                    a.data,
                    d.gigovId,
                    d.gigovNome,
                    e.sigla AS siglaGestor,
                    e.nome AS nomeGestor,
                    ISNULL(b.quantidadeOperacoes, 0) AS quantidadeOperacoes,
                    ISNULL(b.quantidadeDocumentos, 0) AS quantidadeDocumentos,
                    ISNULL(b.saldoBloqueado, 0) AS saldoBloqueado,
                    ISNULL((SELECT TOP 1 b.quantidadeOperacoes FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeOperacoesSolicitado,
                    ISNULL((SELECT TOP 1 b.quantidadeDocumentos FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeDocumentosSolicitado,
                    ISNULL((SELECT TOP 1 b.saldo FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS saldoDesbloqueioSolicitado,
                    ISNULL((SELECT TOP 1 b.quantidadeOperacoes FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeOperacoesDesbloqueadas,
                    ISNULL((SELECT TOP 1 b.quantidadeDocumentos FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeDocumentosDesbloqueados,
                    ISNULL((SELECT TOP 1 b.saldo FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS saldoDesbloqueado,
                    @tipoInformacao AS tipoInformacaoId,
                    CASE @tipoInformacao
                    WHEN 1 THEN CONVERT(NVARCHAR(255), 'Todas as operações')
                    WHEN 2 THEN CONVERT(NVARCHAR(255), 'Operações que já cumpriram os critéreios de desbloqueio')
                    WHEN 3 THEN CONVERT(NVARCHAR(255), 'Operações que ainda não cumpriram os critérios de desbloqueio')
                    END AS tipoInformacaoDescricao
                FROM @datas AS a
                LEFT JOIN @bloqueios AS b
                ON a.dataReferencia = b.dataReferencia
                JOIN parametros AS c
                ON YEAR(a.data) = c.anoExecucao
                LEFT JOIN (SELECT DISTINCT gigovId, gigovNome FROM operacoes) AS d
                ON @unidadeId = d.gigovId
                LEFT JOIN ministerios AS e
                ON @siglaGestor = e.sigla
            ) AS a
            RETURN;
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $query = <<<SQL
            ALTER PROCEDURE [dbo].[SP_ESTATISTICAS_BLOQUEIO]
                @anoExecucao AS INT,
                @tipoInformacao AS INT,
                @unidadeId AS INT,
                @siglaGestor AS VARCHAR(10)
            AS
            DECLARE @datas AS TABLE(data DATE, dataReferencia DATE);
            DECLARE @bloqueios AS TABLE(dataReferencia DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldoBloqueado FLOAT);
            DECLARE @solicitacoes AS TABLE(data DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldo FLOAT);
            DECLARE @desbloqueios AS TABLE(data DATE, quantidadeOperacoes INT, quantidadeDocumentos INT, saldo FLOAT);
            INSERT INTO @datas
            SELECT
                *,
                (
                    SELECT DISTINCT TOP 1
                        dataReferencia
                    FROM saldos_notas_empenhos
                    WHERE dataReferencia <= datas.data
                    ORDER by dataReferencia DESC
                ) AS dataReferencia
            FROM (
                SELECT
                    DATEADD(DAY,number, b.dataBloqueio) AS data
                FROM master..spt_values AS a
                JOIN parametros AS b
                ON YEAR(DATEADD(DAY,number, b.dataBloqueio)) = b.anoExecucao
                WHERE type = 'P'
                AND DATEADD(DAY, a.number, b.dataBloqueio) <= GETDATE()
            ) AS datas
            INSERT INTO @bloqueios
            SELECT
                a.dataReferencia,
                COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                COUNT(*) AS quantidadeDocumentos,
                SUM(a.saldoContaContabil) AS saldoBloqueado
            FROM saldos_notas_empenhos AS a
            JOIN parametros AS b
            ON YEAR(a.dataReferencia) = b.anoExecucao
            AND a.dataReferencia >= b.dataBloqueio
            JOIN pcasp AS c
            ON a.pcaspId = c.id
            AND b.anoExecucao = c.ano
            AND b.pcaspClasse = c.classe
            AND b.pcaspGrupo = c.grupo
            AND b.pcaspSubgrupo = c.subgrupo
            AND	b.pcaspTituloBloqueio = c.titulo
            JOIN operacoes AS d
            ON a.operacaoId = d.id
            AND d.situacaoContrato = 'CONTRATADA'
            JOIN ugs AS e
            ON e.id = a.ugId
            JOIN ministerios AS f
            ON e.ministerioId = f.id
            WHERE (
                (@unidadeId IS NULL AND gigovId IS NOT NULL)
                OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
            )
            AND (
                (@siglaGestor IS NULL AND sigla IS NOT NULL)
                OR (@siglaGestor IS NOT NULL AND f.sigla = @siglaGestor)
            )
            AND YEAR(a.dataReferencia) = @anoExecucao
            AND (
                (@tipoInformacao = 1 AND d.aptaDesbloqueio IS NOT NULL)
                OR (@tipoInformacao = 2 AND d.aptaDesbloqueio = 1)
                OR (@tipoInformacao = 3 AND d.aptaDesbloqueio = 0)
            )
            GROUP BY
                a.dataReferencia
            INSERT INTO @solicitacoes
            SELECT 
                dataSolicitacao,
                SUM(quantidadeOperacoes) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeOperacoes,
                SUM(quantidadeDocumentos) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeDocumentos,
                SUM(saldo) OVER (ORDER BY dataSolicitacao ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS saldo
            FROM (
                SELECT
                    CONVERT(DATE, a.created_at) AS dataSolicitacao,
                    COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                    COUNT(*) AS quantidadeDocumentos,
                    SUM(saldo) AS saldo
                FROM lote_desbloqueio_operacoes AS a
                JOIN parametros AS b
                ON YEAR(a.created_at) = b.anoExecucao
                JOIN saldos_notas_empenhos AS c
                ON a.operacaoId = c.operacaoId
                AND a.documento = c.documento
                AND b.dataBloqueio = c.dataReferencia
                JOIN pcasp AS d
                ON b.anoExecucao = d.ano
                AND b.pcaspClasse = d.classe
                AND b.pcaspGrupo = d.grupo
                AND b.pcaspSubgrupo = d.subgrupo
                AND b.pcaspTituloBloqueio = d.titulo
                AND c.pcaspId = d.id
                JOIN operacoes AS e
                ON a.operacaoId = e.id
                JOIN ugs AS f
                ON c.ugId = f.id
                JOIN ministerios AS g
                ON f.ministerioId = g.id
                WHERE (
                    (@unidadeId IS NULL AND gigovId IS NOT NULL)
                    OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
                )
                AND (
                    (@siglaGestor IS NULL AND sigla IS NOT NULL)
                    OR (@siglaGestor IS NOT NULL AND g.sigla = @siglaGestor)
                )
                AND YEAR(a.created_at) = @anoExecucao
                AND (
                    (@tipoInformacao = 1 AND e.aptaDesbloqueio IS NOT NULL)
                    OR (@tipoInformacao = 2 AND e.aptaDesbloqueio = 1)
                    OR (@tipoInformacao = 3 AND e.aptaDesbloqueio = 0)
                )
                GROUP BY
                    CONVERT(DATE, a.created_at)
            ) AS a
            INSERT INTO @desbloqueios
            SELECT 
                a.dataDesbloqueio,
                b.quantidadeOperacoes,
                SUM(quantidadeDocumentos) OVER (ORDER BY a.dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeDocumentos,
                SUM(saldo) OVER (ORDER BY a.dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS saldo
            FROM (
                SELECT
                    CONVERT(DATE, a.updated_at) AS dataDesbloqueio,
                    COUNT(DISTINCT a.operacaoId) AS quantidadeOperacoes,
                    COUNT(*) AS quantidadeDocumentos,
                    SUM(a.saldo) AS saldo
                FROM lote_desbloqueio_operacoes AS a
                JOIN parametros AS b
                ON YEAR(a.created_at) = b.anoExecucao
                JOIN saldos_notas_empenhos AS c
                ON a.operacaoId = c.operacaoId
                AND a.documento = c.documento
                AND b.dataBloqueio = c.dataReferencia
                JOIN pcasp AS d
                ON b.anoExecucao = d.ano
                AND b.pcaspClasse = d.classe
                AND b.pcaspGrupo = d.grupo
                AND b.pcaspSubgrupo = d.subgrupo
                AND b.pcaspTituloBloqueio = d.titulo
                AND c.pcaspId = d.id
                JOIN operacoes AS e
                ON a.operacaoId = e.id
                JOIN ugs AS f
                ON c.ugId = f.id
                JOIN ministerios AS g
                ON f.ministerioId = g.id
                WHERE a.desbloqueado = 1
                AND (
                    (
                        (@unidadeId IS NULL AND gigovId IS NOT NULL)
                        OR (@unidadeId IS NOT NULL AND gigovId = @unidadeId)
                    )
                    AND (
                        (@siglaGestor IS NULL AND sigla IS NOT NULL)
                        OR (@siglaGestor IS NOT NULL AND g.sigla = @siglaGestor)
                    )
                    AND YEAR(a.updated_at) = @anoExecucao
                    AND (
                        (@tipoInformacao = 1 AND e.aptaDesbloqueio IS NOT NULL)
                        OR (@tipoInformacao = 2 AND e.aptaDesbloqueio = 1)
                        OR (@tipoInformacao = 3 AND e.aptaDesbloqueio = 0)
                    )
                )
                GROUP BY
                    CONVERT(DATE, a.updated_at)
            ) AS a
            LEFT JOIN (
                SELECT
                    dataDesbloqueio,
                    SUM(quantidadeOperacoes) OVER (ORDER BY dataDesbloqueio ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS quantidadeOperacoes
                FROM (
                    SELECT
                        updated_at as dataDesbloqueio,
                        count(*) as quantidadeOperacoes
                    FROM (
                        SELECT
                            operacaoId,
                            CONVERT(DATE, min(updated_at)) as updated_at
                        FROM
                            dbo.lote_desbloqueio_operacoes 
                        GROUP BY operacaoId
                    ) as h0
                    GROUP BY updated_at
                ) as h
            ) as b
            ON a.dataDesbloqueio = b.dataDesbloqueio
            SELECT
                id,
                anoExecucao,
                anoOrcamentario,
                data,
                gigovId,
                gigovNome,
                siglaGestor,
                nomeGestor,
                quantidadeOperacoes AS quantidadeOperacoesBloqueadas,
                quantidadeDocumentos AS quantidadeDocumentosBloqueados,
                saldoBloqueado,
                quantidadeOperacoesSolicitado - quantidadeOperacoesDesbloqueadas AS quantidadeOperacoesAguardandoDesbloqueio,
                quantidadeDocumentosSolicitado - quantidadeDocumentosDesbloqueados AS quantidadeDocumentosAguardandoDesbloqueio,
                saldoDesbloqueioSolicitado - saldoDesbloqueado AS saldoAguardandoDesbloqueio,
                quantidadeOperacoesDesbloqueadas,
                quantidadeDocumentosDesbloqueados,
                saldoDesbloqueado,
                tipoInformacaoId,
                tipoInformacaoDescricao
            FROM (
                SELECT
                    ROW_NUMBER() OVER (ORDER BY a.data) AS id,
                    c.anoExecucao,
                    c.anoOrcamentario,
                    a.data,
                    d.gigovId,
                    d.gigovNome,
                    e.sigla AS siglaGestor,
                    e.nome AS nomeGestor,
                    ISNULL(b.quantidadeOperacoes, 0) AS quantidadeOperacoes,
                    ISNULL(b.quantidadeDocumentos, 0) AS quantidadeDocumentos,
                    ISNULL(b.saldoBloqueado, 0) AS saldoBloqueado,
                    ISNULL((SELECT TOP 1 b.quantidadeOperacoes FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeOperacoesSolicitado,
                    ISNULL((SELECT TOP 1 b.quantidadeDocumentos FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeDocumentosSolicitado,
                    ISNULL((SELECT TOP 1 b.saldo FROM @solicitacoes AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS saldoDesbloqueioSolicitado,
                    ISNULL((SELECT TOP 1 b.quantidadeOperacoes FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeOperacoesDesbloqueadas,
                    ISNULL((SELECT TOP 1 b.quantidadeDocumentos FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS quantidadeDocumentosDesbloqueados,
                    ISNULL((SELECT TOP 1 b.saldo FROM @desbloqueios AS b WHERE b.data <= a.data ORDER BY b.data DESC), 0) AS saldoDesbloqueado,
                    @tipoInformacao AS tipoInformacaoId,
                    CASE @tipoInformacao
                    WHEN 1 THEN CONVERT(NVARCHAR(255), 'Todas as operações')
                    WHEN 2 THEN CONVERT(NVARCHAR(255), 'Operações que já cumpriram os critéreios de desbloqueio')
                    WHEN 3 THEN CONVERT(NVARCHAR(255), 'Operações que ainda não cumpriram os critérios de desbloqueio')
                    END AS tipoInformacaoDescricao
                FROM @datas AS a
                LEFT JOIN @bloqueios AS b
                ON a.dataReferencia = b.dataReferencia
                JOIN parametros AS c
                ON YEAR(a.data) = c.anoExecucao
                LEFT JOIN (SELECT DISTINCT gigovId, gigovNome FROM operacoes) AS d
                ON @unidadeId = d.gigovId
                LEFT JOIN ministerios AS e
                ON @siglaGestor = e.sigla
            ) AS a
            RETURN;
        SQL;

        $this->execute($query);
    }
}
