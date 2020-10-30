<?php


use Phinx\Seed\AbstractSeed;

class MinisteriosSeeder extends AbstractSeed
{
    public function run()
    {
        $data = [
            ['id' => 1, 'nome' => 'Ministério do Desenvolvimento Regional', 'sigla' => 'MDR', 'criacao' => '2020-01-01'],
            ['id' => 2, 'nome' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'sigla' => 'MAPA', 'criacao' => '2020-01-01'],
            ['id' => 3, 'nome' => 'Ministério da Cidadania', 'sigla' => 'MC', 'criacao' => '2020-01-01'],
            ['id' => 4, 'nome' => 'Ministério do Turismo', 'sigla' => 'MTUR', 'criacao' => '2020-01-01'],
            ['id' => 5, 'nome' => 'Ministério da Economia', 'sigla' => 'ME', 'criacao' => '2020-01-01'],
            ['id' => 6, 'nome' => 'Ministério da Justiça e Segurança Pública', 'sigla' => 'MJS', 'criacao' => '2020-01-01'],
            ['id' => 7, 'nome' => 'Ministério da Ciência, Tecnologia, Inovações e Comunicações', 'sigla' => 'MCTIC', 'criacao' => '2020-01-01'],
            ['id' => 8, 'nome' => 'Ministério da Saúde', 'sigla' => 'MS', 'criacao' => '2020-01-01'],
            ['id' => 9, 'nome' => 'Ministério do Meio Ambiente', 'sigla' => 'MMA', 'criacao' => '2020-01-01'],
            ['id' => 10, 'nome' => 'Ministério da Defesa', 'sigla' => 'MD', 'criacao' => '2020-01-01'],
            ['id' => 11, 'nome' => 'Ministério da Infraestrutura', 'sigla' => 'MI', 'criacao' => '2020-01-01'],
            ['id' => 12, 'nome' => 'Ministério da Mulher, da Família e dos Direitos Humanos', 'sigla' => 'MMFDH', 'criacao' => '2020-01-01'],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.Tool ON');

        $this
            ->table('ministerios')
            ->insert($data)
            ->save();
;
        $this->execute('SET IDENTITY_INSERT dbo.Tool OFF');
    }
}
