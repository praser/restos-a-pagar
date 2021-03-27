<?php

use Phinx\Migration\AbstractMigration;

class CreateVwLoteDesbloqueioFile extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_lote_desbloqueio_file AS
            SELECT
                loteDesbloqueioId AS id
                ,RIGHT(CONCAT('000', a.sequencial, '/', a.ano), 10) AS lote
                ,g.codigo AS ug
                ,h.proponente AS tomador
                ,h.uf
                ,h.proposta
                ,h.convenio
                ,b.documento
                ,b.saldo AS valorBloqueado
                ,h.percentualFisicoAferido
                ,CASE
                WHEN a.liminarId IS NULL THEN 'Conforme Decreto 93.872, de 23 de dezembro de 1986'
                ELSE 'Liminar judicial'
                END AS tipo
                ,a.created_at
                ,a.updated_at
            FROM dbo.lotes_desbloqueio AS a
            JOIN dbo.lote_desbloqueio_operacoes AS b
            ON a.id = b.loteDesbloqueioId
            JOIN cache.calendario AS c
            ON CONVERT(DATE, a.created_at) = c.data
            JOIN dbo.parametros AS d
            ON a.ano = d.anoExecucao
            JOIN dbo.pcasp AS e
            ON d.pcaspClasse = e.classe
            AND d.pcaspGrupo = e.grupo
            AND d.pcaspSubgrupo = e.subgrupo
            AND d.pcaspTituloBloqueio = e.titulo
            AND d.anoExecucao = e.ano
            JOIN dbo.saldos_notas_empenhos AS f
            ON b.operacaoId = f.operacaoId
            AND b.documento = f.documento
            AND e.id = f.pcaspId
            AND c.dataReferencia = f.dataReferencia
            JOIN dbo.ugs AS g
            ON f.ugId = g.id
            JOIN dbo.operacoes AS h
            ON b.operacaoId = h.id
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_lote_desbloqueio_file');
    }
}
