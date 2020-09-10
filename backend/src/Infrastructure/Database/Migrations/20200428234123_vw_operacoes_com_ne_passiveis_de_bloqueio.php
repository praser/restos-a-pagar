<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection AutoloadingIssuesInspection */
/** @noinspection PhpUnused */

use Phinx\Migration\AbstractMigration;

class VwOperacoesComNePassiveisDeBloqueio extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            CREATE VIEW vw_operacoes_com_ne_passiveis_de_bloqueio AS
            SELECT DISTINCT
                a.*
            FROM operacoes a
            JOIN vw_saldos_notas_empenhos b
            ON a.id = b.operacaoId
            JOIN pcasp c
            ON b.pcaspId = c.id
            JOIN ugs d
            ON b.ugId = d.id
            JOIN tipo_resultado_primario e
            ON b.tipoResultadoPrimarioId = e.id
            JOIN operacoes f
            ON a.operacao = f.operacao
            WHERE b.anoOrcamentario = 2018
            AND c.conta = 631100000
            AND d.codigo <> 250107
            AND e.idSiafi <> 6
            AND f.situacaoContrato = 'CONTRATADA'
            AND (
                f.dataAIO IS NULL
                OR (
                    f.situacaoContratoComplemento = 'SUSPENSIVA'
                    AND f.dataVRPL IS NULL
                )
            )
        SQL;

        $this->execute($query);
    }

    public function down(): void
    {
        $this->execute('DROP VIEW vw_operacoes_com_ne_passiveis_de_bloqueio');
    }
}
