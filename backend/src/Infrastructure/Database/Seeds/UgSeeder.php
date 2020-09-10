<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection PhpUnused */


use Phinx\Seed\AbstractSeed;

class UgSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run(): void
    {
        $data = [
            ['codigo' => 175004, 'arquivo' => 'Ministério do Desenvolvimento Regional', 'nomeGestor' => 'Ministério do Desenvolvimento Regional', 'siglaGestor' => 'MDR'],
            ['codigo' => 133089, 'arquivo' => 'INST.NAC.DE COLONIZ.E REFORMA AGRARIA-INCRA', 'nomeGestor' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'siglaGestor' => 'MAPA'],
            ['codigo' => 135098, 'arquivo' => 'CAIXA ECONOMICA FEDERAL/MA', 'nomeGestor' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'siglaGestor' => 'MAPA'],
            ['codigo' => 180006, 'arquivo' => 'Ministério da Cidadania', 'nomeGestor' => 'Ministério da Cidadania', 'siglaGestor' => 'MC'],
            ['codigo' => 187003, 'arquivo' => 'EMBRATUR - CAIXA ECONOMICA FEDERAL', 'nomeGestor' => 'Ministério do Turismo', 'siglaGestor' => 'MTUR'],
            ['codigo' => 193054, 'arquivo' => 'SUFRAMA/CAIXA ECONOMICA FEDERAL - CEF', 'nomeGestor' => 'Ministério da Economia', 'siglaGestor' => 'ME'],
            ['codigo' => 200244, 'arquivo' => 'Ministério do Turismo', 'nomeGestor' => 'Ministério do Turismo', 'siglaGestor' => 'MTUR'],
            ['codigo' => 200321, 'arquivo' => 'CEF - DEPARTAMENTO PENITENCIARIO NACIONAL-MJ', 'nomeGestor' => 'Ministério da Justiça e Segurança Pública', 'siglaGestor' => 'MJS'],
            ['codigo' => 200329, 'arquivo' => 'Ministério da Justiça e Segurança Pública', 'nomeGestor' => 'Ministério da Justiça e Segurança Pública', 'siglaGestor' => 'MJS'],
            ['codigo' => 240138, 'arquivo' => 'SECRET. DE C & T P/ INCLUSAO SOCIAL/MCT - CEF', 'nomeGestor' => 'Ministério da Ciência, Tecnologia, Inovações e Comunicações', 'siglaGestor' => 'MCTIC'],
            ['codigo' => 250107, 'arquivo' => 'Ministério da Saúde', 'nomeGestor' => 'Ministério da Saúde', 'siglaGestor' => 'MS'],
            ['codigo' => 343048, 'arquivo' => 'CAIXA ECONOMICA FEDERAL - PAC CH - IPHAN', 'nomeGestor' => 'Ministério do Turismo', 'siglaGestor' => 'MTUR'],
            ['codigo' => 420045, 'arquivo' => 'Ministério do Turismo', 'nomeGestor' => 'Ministério do Turismo', 'siglaGestor' => 'MTUR'],
            ['codigo' => 440093, 'arquivo' => 'CORREDORES ECOLOGLICOS - KFW - CAIXA.', 'nomeGestor' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'siglaGestor' => 'MAPA'],
            ['codigo' => 440107, 'arquivo' => 'Ministério do Meio Ambiente', 'nomeGestor' => 'Ministério do Meio Ambiente', 'siglaGestor' => 'MMA'],
            ['codigo' => 443002, 'arquivo' => 'Agência Nacional de Águas', 'nomeGestor' => 'Ministério do Desenvolvimento Regional', 'siglaGestor' => 'MDR'],
            ['codigo' => 443023, 'arquivo' => 'CAIXA ECONOMICA FEDERAL- MIN. DO MEIO AMBIEN', 'nomeGestor' => 'Ministério do Meio Ambiente', 'siglaGestor' => 'MMA'],
            ['codigo' => 530020, 'arquivo' => 'CAIXA ECONOMICA FEDERAL - MI', 'nomeGestor' => 'Ministério do Desenvolvimento Regional', 'siglaGestor' => 'MDR'],
            ['codigo' => 533027, 'arquivo' => 'CAIXA ECONOMICA FEDERAL - SUDECO', 'nomeGestor' => 'Ministério do Desenvolvimento Regional', 'siglaGestor' => 'MDR'],
            ['codigo' => 540007, 'arquivo' => 'CEF/MINISTERIO DO TURISMO/MTUR', 'nomeGestor' => 'Ministério do Turismo', 'siglaGestor' => 'MTUR'],
            ['codigo' => 550013, 'arquivo' => 'PROJETO DE OPERACIONALIZ. DOS PROGRAMAS SESAN', 'nomeGestor' => 'Ministério da Cidadania', 'siglaGestor' => 'MC'],
            ['codigo' => 550015, 'arquivo' => 'PROJETO DE OPERACION. DOS PROGRAMAS DA SNAS', 'nomeGestor' => 'Ministério da Cidadania', 'siglaGestor' => 'MC'],
            ['codigo' => 560018, 'arquivo' => 'CAIXA ECONOMICA FEDERAL - FNHIS', 'nomeGestor' => 'Ministério do Desenvolvimento Regional', 'siglaGestor' => 'MDR'],
            ['codigo' => 400049, 'arquivo' => 'CAIXA/MTPS', 'nomeGestor' => 'Ministério da Economia', 'siglaGestor' => 'ME'],
            ['codigo' => 110747, 'arquivo' => 'DEPARTAMENTO DO PROGRAMA CALHA NORTE - CEF', 'nomeGestor' => 'Ministério da Defesa', 'siglaGestor' => 'MD'],
            ['codigo' => 110765, 'arquivo' => 'CEF- REPASSE PREST.SERVICO', 'nomeGestor' => 'Ministério da Infraestrutura', 'siglaGestor' => 'MI'],
            ['codigo' => 130233, 'arquivo' => 'CEF/SAP-MAPA - CONTRATOS DE REPASSE', 'nomeGestor' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'siglaGestor' => 'MAPA'],
            ['codigo' => 130234, 'arquivo' => 'SECRETARIA DE AGRIC. FAM.E COOPERATIVIS/CEF', 'nomeGestor' => 'Ministério da Agricultura, Pecuária e Abastecimento', 'siglaGestor' => 'MAPA'],
            ['codigo' => 810023, 'arquivo' => 'CAIXA/MMFDH', 'nomeGestor' => 'Ministério da Mulher, da Família e dos Direitos Humanos', 'siglaGestor' => 'MMFDH'],
            ['codigo' => 200412, 'arquivo' => 'CEF/FDD - CONTRATO DE REPASSE', 'nomeGestor' => 'Ministério da Justiça e Segurança Pública', 'siglaGestor' => 'MJS'],
        ];
        
        $this
            ->table('ugs')
            ->insert($data)
            ->save();
    }
}
