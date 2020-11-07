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
                        operacao,
                        MAX(dataRetiradaSuspensiva) AS dataCumprimentoCriteriosDesbloqueio
                    FROM dbo.operacoes
                    WHERE dataRetiradaSuspensiva IS NOT NULL
                    GROUP BY operacao
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
