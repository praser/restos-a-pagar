<?php


use Phinx\Seed\AbstractSeed;

class ParametrosCriteriosDesbloqueioSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'ParametrosSeeder',
            'TipoResultadoPrimarioSeeder'
        ];
    }

    public function run()
    {
        $data = [
            [
                'id' => 1,
                'parametroId' => 1,
                'query' => <<<SQL
                    SELECT
                        a.operacao,
                        MAX(a.dataRetiradaSuspensiva) AS dataCumprimentoCriteriosDesbloqueio,
                        CONVERT(BIT, CASE 
                            WHEN MAX(a.dataRetiradaSuspensiva) < b.dataBloqueio THEN 1
                            ELSE 0
                        END) AS aptaDesbloqueio
                    FROM dbo.operacoes a
                    JOIN dbo.parametros AS b
                    ON b.id = 1
                    WHERE a.dataRetiradaSuspensiva IS NOT NULL
                    GROUP BY a.operacao, b.dataBloqueio
                    ORDER BY MAX(a.dataRetiradaSuspensiva) DESC
                SQL,
                'inicioVigencia' => '2020-01-01',
                'responsavelId' => 'c094224',
                'responsavelNome' => 'Romina Beatriz Silva Moura',
                'responsavelUnidadeId' => 5385,
                'responsavelUnidadeSigla' => 'GEOTR',
            ],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.parametros_criterios_desbloqueio ON');

        $this
            ->table('parametros_criterios_desbloqueio')
            ->insert($data)
            ->save();
        
        $this->execute('SET IDENTITY_INSERT dbo.parametros_criterios_desbloqueio OFF');
    }
}
