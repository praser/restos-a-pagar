<?php

use Phinx\Migration\AbstractMigration;

class CreateVwLiminares extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_liminares AS
            SELECT
                a.id,
                a.numeroProcesso,
                a.requerente,
                a.dataDecisao,
                a.siarg,
                CAST(a.observacoes AS VARCHAR(MAX)) AS observacoes,
                a.responsavelCadastramentoId,
                a.responsavelCadastramentoNome,
                a.responsavelCadastramentoUnidadeId,
                a.responsavelCadastramentoUnidadeSigla,
                a.dataAteste,
                a.responsavelAtesteId,
                a.responsavelAtesteNome,
                a.responsavelAtesteUnidadeId,
                a.responsavelAtesteUnidadeSigla,
                a.fimVigencia,
                a.responsavelFimVigenciaId,
                a.responsavelFimVigenciaNome,
                a.responsavelFimVigenciaUnidadeId,
                a.responsavelFimVigenciaUnidadeSigla,
                COUNT(DISTINCT e.documento) AS empenhosBloqueados,
                a.created_at,
                a.updated_at
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
            LEFT JOIN saldos_notas_empenhos AS e
            ON b.operacaoId = e.operacaoId
            AND e.dataReferencia = (SELECT MAX(dataReferencia) FROM saldos_notas_empenhos)
            AND e.pcaspId = d.id
            GROUP BY 
                a.id,
                a.numeroProcesso,
                a.requerente,
                a.dataDecisao,
                a.siarg,
                CAST(a.observacoes AS VARCHAR(MAX)),
                a.responsavelCadastramentoId,
                a.responsavelCadastramentoNome,
                a.responsavelCadastramentoUnidadeId,
                a.responsavelCadastramentoUnidadeSigla,
                a.dataAteste,
                a.responsavelAtesteId,
                a.responsavelAtesteNome,
                a.responsavelAtesteUnidadeId,
                a.responsavelAtesteUnidadeSigla,
                a.fimVigencia,
                a.responsavelFimVigenciaId,
                a.responsavelFimVigenciaNome,
                a.responsavelFimVigenciaUnidadeId,
                a.responsavelFimVigenciaUnidadeSigla,
                a.created_at,
                a.updated_at
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_liminares');
    }
}
