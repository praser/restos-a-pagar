<?php

use Phinx\Seed\AbstractSeed;

class ParametrosSeeder extends AbstractSeed
{
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'anoExecucao' => 2020,
                'anoOrcamentario' => 2018,
                'pcaspClasse' => 6,
                'pcaspGrupo' => 3,
                'pcaspSubgrupo' => 1,
                'pcaspTituloPreBloqueio' => 1,
                'pcaspTituloBloqueio' => 5,
                'pcaspTituloCancelamento' => 9,
                'dataBloqueio' => '2020-11-14',
                'dataCancelamento' => '2020-12-31',
            ],
            [
                'id' => 2,
                'anoExecucao' => 2021,
                'anoOrcamentario' => 2019,
                'pcaspClasse' => 6,
                'pcaspGrupo' => 3,
                'pcaspSubgrupo' => 1,
                'pcaspTituloPreBloqueio' => 1,
                'pcaspTituloBloqueio' => 5,
                'pcaspTituloCancelamento' => 9,
                'dataBloqueio' => '2021-03-16',
                'dataCancelamento' => '2021-12-31',
            ],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.parametros ON');

        $this
            ->table('parametros')
            ->insert($data)
            ->save();
        
        $this->execute('SET IDENTITY_INSERT dbo.parametros OFF');
    }
}
