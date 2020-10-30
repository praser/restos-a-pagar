<?php

use Phinx\Migration\AbstractMigration;

class CreateVwParametros extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_parametros AS
            SELECT
                a.id,
                a.anoExecucao,
                a.anoOrcamentario,
                a.pcaspClasse,
                a.pcaspGrupo,
                a.pcaspSubgrupo,
                a.pcaspTituloPreBloqueio,
                a.pcaspTituloBloqueio,
                a.pcaspTituloCancelamento,
                a.dataBloqueio,
                a.dataCancelamento,
                b.ugId AS ugNaoParticipanteId,
                c.tipoResultadoPrimarioId AS tipoResultadoPrimarioNaoParticipanteId
            FROM dbo.parametros a
            JOIN dbo.parametros_ug_nao_participantes b
            ON a.id = b.parametroId
            JOIN dbo.parametros_tipo_resultado_primario_nao_participante c
            ON a.id = c.parametroId
        SQL;
        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_parametros');
    }
}
