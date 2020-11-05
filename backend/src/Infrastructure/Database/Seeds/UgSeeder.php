<?php

/** @noinspection PhpIllegalPsrClassPathInspection */
/** @noinspection PhpUnused */


use Phinx\Seed\AbstractSeed;

class UgSeeder extends AbstractSeed
{
    public function getDependencies()
    {
        return [
            'MinisteriosSeeder'
        ];
    }

    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'codigo' => 175004,
                'nome' => 'Ministério do Desenvolvimento Regional',
                'ministerioId' => 1
            ],
            [
                'id' => 2,
                'codigo' => 133089,
                'nome' => 'INST.NAC.DE COLONIZ.E REFORMA AGRARIA-INCRA',
                'ministerioId' => 2
            ],
            [
                'id' => 3,
                'codigo' => 135098,
                'nome' => 'CAIXA ECONOMICA FEDERAL/MA',
                'ministerioId' => 2
            ],
            [
                'id' => 4,
                'codigo' => 180006,
                'nome' => 'Ministério da Cidadania',
                'ministerioId' => 3
            ],
            [
                'id' => 5,
                'codigo' => 187003,
                'nome' => 'EMBRATUR - CAIXA ECONOMICA FEDERAL',
                'ministerioId' => 4
            ],
            [
                'id' => 6,
                'codigo' => 193054,
                'nome' => 'SUFRAMA/CAIXA ECONOMICA FEDERAL - CEF',
                'ministerioId' => 5
            ],
            [
                'id' => 7,
                'codigo' => 200244,
                'nome' => 'Ministério do Turismo',
                'ministerioId' => 4
            ],
            [
                'id' => 8,
                'codigo' => 200321,
                'nome' => 'CEF - DEPARTAMENTO PENITENCIARIO NACIONAL-MJ',
                'ministerioId' => 6
            ],
            [
                'id' => 9,
                'codigo' => 200329,
                'nome' => 'Ministério da Justiça e Segurança Pública',
                'ministerioId' => 6
            ],
            [
                'id' => 10,
                'codigo' => 240138,
                'nome' => 'SECRET. DE C & T P/ INCLUSAO SOCIAL/MCT - CEF',
                'ministerioId' => 7
            ],
            [
                'id' => 11,
                'codigo' => 250107,
                'nome' => 'Ministério da Saúde',
                'ministerioId' => 8
            ],
            [
                'id' => 12,
                'codigo' => 343048,
                'nome' => 'CAIXA ECONOMICA FEDERAL - PAC CH - IPHAN',
                'ministerioId' => 4
            ],
            [
                'id' => 13,
                'codigo' => 420045,
                'nome' => 'Ministério do Turismo',
                'ministerioId' => 4
            ],
            [
                'id' => 14,
                'codigo' => 440093,
                'nome' => 'CORREDORES ECOLOGLICOS - KFW - CAIXA.',
                'ministerioId' => 2
            ],
            [
                'id' => 15,
                'codigo' => 440107,
                'nome' => 'Ministério do Meio Ambiente',
                'ministerioId' => 9
            ],
            [
                'id' => 16,
                'codigo' => 443002,
                'nome' => 'Agência Nacional de Águas',
                'ministerioId' => 1
            ],
            [
                'id' => 17,
                'codigo' => 443023,
                'nome' => 'CAIXA ECONOMICA FEDERAL- MIN. DO MEIO AMBIEN',
                'ministerioId' => 9
            ],
            [
                'id' => 18,
                'codigo' => 530020,
                'nome' => 'CAIXA ECONOMICA FEDERAL - MI',
                'ministerioId' => 1
            ],
            [
                'id' => 19,
                'codigo' => 533027,
                'nome' => 'CAIXA ECONOMICA FEDERAL - SUDECO',
                'ministerioId' => 1
            ],
            [
                'id' => 20,
                'codigo' => 540007,
                'nome' => 'CEF/MINISTERIO DO TURISMO/MTUR',
                'ministerioId' => 4
            ],
            [
                'id' => 21,
                'codigo' => 550013,
                'nome' => 'PROJETO DE OPERACIONALIZ. DOS PROGRAMAS SESAN',
                'ministerioId' => 3
            ],
            [
                'id' => 22,
                'codigo' => 550015,
                'nome' => 'PROJETO DE OPERACION. DOS PROGRAMAS DA SNAS',
                'ministerioId' => 3
            ],
            [
                'id' => 23,
                'codigo' => 560018,
                'nome' => 'CAIXA ECONOMICA FEDERAL - FNHIS',
                'ministerioId' => 1
            ],
            [
                'id' => 24,
                'codigo' => 400049,
                'nome' => 'CAIXA/MTPS',
                'ministerioId' => 5
            ],
            [
                'id' => 25,
                'codigo' => 110747,
                'nome' => 'DEPARTAMENTO DO PROGRAMA CALHA NORTE - CEF',
                'ministerioId' => 10
            ],
            [
                'id' => 26,
                'codigo' => 110765,
                'nome' => 'CEF- REPASSE PREST.SERVICO',
                'ministerioId' => 11
            ],
            [
                'id' => 27,
                'codigo' => 130233,
                'nome' => 'CEF/SAP-MAPA - CONTRATOS DE REPASSE',
                'ministerioId' => 2
            ],
            [
                'id' => 28,
                'codigo' => 130234,
                'nome' => 'SECRETARIA DE AGRIC. FAM.E COOPERATIVIS/CEF',
                'ministerioId' => 2
            ],
            [
                'id' => 29,
                'codigo' => 810023,
                'nome' => 'CAIXA/MMFDH',
                'ministerioId' => 12
            ],
            [
                'id' => 30,
                'codigo' => 200412,
                'nome' => 'CEF/FDD - CONTRATO DE REPASSE',
                'ministerioId' => 6
            ],
            [
                'id' => 31,
                'codigo' => 110754,
                'nome' => 'CEF-SEAP-PR / MINISTÉRIO DA PESCA',
                'ministerioId' => 2
            ],
            [
                'id' => 32,
                'codigo' => 280123,
                'nome' => 'CEF - Ministério da Indústria e Comércio Exterior',
                'ministerioId' => 5
            ],
            [
                'id' => 33,
                'codigo' => 540045,
                'nome' => 'CEF - PAC MINC',
                'ministerioId' => 2
            ],
        ];

        $this->execute('SET IDENTITY_INSERT dbo.ugs ON');
        
        $this
            ->table('ugs')
            ->insert($data)
            ->save();

        $this->execute('SET IDENTITY_INSERT dbo.ugs OFF');
    }
}
