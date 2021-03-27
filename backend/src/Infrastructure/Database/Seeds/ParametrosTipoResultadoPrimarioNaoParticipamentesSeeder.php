<?php

use Phinx\Seed\AbstractSeed;

class ParametrosTipoResultadoPrimarioNaoParticipamentesSeeder extends AbstractSeed
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
            [ 'id' => 1, 'parametroId' => 1, 'tipoResultadoPrimarioId' => 4 ],
            ['id' => 2, 'parametroId' => 2, 'tipoResultadoPrimarioId' => 4],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.parametros_tipo_resultado_primario_nao_participante ON');

        $this
            ->table('parametros_tipo_resultado_primario_nao_participante')
            ->insert($data)
            ->save();
        
        $this->execute('SET IDENTITY_INSERT dbo.parametros_tipo_resultado_primario_nao_participante OFF');
    }
}
