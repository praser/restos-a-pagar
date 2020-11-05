<?php

use Phinx\Seed\AbstractSeed;

class ParametrosUgNaoParticipamentesSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'ParametrosSeeder',
            'UgSeeder'
        ];
    }

    public function run()
    {
        $data = [
            [ 'id' => 1, 'parametroId' => 1, 'ugId' => 11 ],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.parametros_ug_nao_participantes ON');

        $this
            ->table('parametros_ug_nao_participantes')
            ->insert($data)
            ->save();
        
        $this->execute('SET IDENTITY_INSERT dbo.parametros_ug_nao_participantes OFF');
    }
}
