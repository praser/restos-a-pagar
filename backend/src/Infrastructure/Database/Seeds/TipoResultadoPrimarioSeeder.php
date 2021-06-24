<?php


use Phinx\Seed\AbstractSeed;

class TipoResultadoPrimarioSeeder extends AbstractSeed
{
    public function run()
    {
        $data = [
            ['id' => 1, 'idSiafi'=> 1, 'descricao' => 'PRIMARIO OBRIGATORIO'],
            ['id' => 2, 'idSiafi'=> 2, 'descricao' => 'PRIMARIO DISCRICIONARIO'],
            ['id' => 3, 'idSiafi'=> 3, 'descricao' => 'PRIMARIO SEM IMPACTO FISCAL'],
            ['id' => 4, 'idSiafi'=> 6, 'descricao' => 'DESPESA DISCRICIONARIA DECORRENTE DE EMENDA INDIVIDUAL'],
            ['id' => 5, 'idSiafi'=> 7, 'descricao' => 'DESPESA DISCRICIONARIA DECORRENTE DE EMENDA DE BANCADA'],
            ['id' => 6, 'idSiafi'=> 9, 'descricao' => 'DESP.DISC.DECORRENTE DE EMENDA DIR.GERAL PLOA,EXC.ORDEM TEC'],
            ['id' => 7, 'idSiafi'=> 8, 'descricao' => 'DESP.DISC.DECORRENTE DE EMENDA SF,CD E COMISAO MISTA CN'],
            ['id' => 8, 'idSiafi'=> -7, 'descricao' => 'CODIGO INVALIDO'],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.tipo_resultado_primario ON');

        $this
            ->table('tipo_resultado_primario')
            ->insert($data)
            ->save();
        
        $this->execute('SET IDENTITY_INSERT dbo.tipo_resultado_primario OFF');
    }
}
