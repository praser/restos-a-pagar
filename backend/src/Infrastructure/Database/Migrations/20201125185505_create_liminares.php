<?php

use Phinx\Migration\AbstractMigration;

class CreateLiminares extends AbstractMigration
{
    public function change()
    {
        $this
            ->table('liminares')
            ->addColumn('numeroProcesso', 'string', ['comment' => 'Número do processo que originou a liminar'])
            ->addColumn('requerente', 'string', ['comment' => 'Nome do requrente da liminar'])
            ->addColumn('dataDecisao', 'date', ['comment' => 'Data em que a liminar foi expedida pelo juiz'])
            ->addColumn('siarg', 'integer', ['comment' => 'Número do SIARG aberto para o cumprimento da decisão'])
            ->addColumn('observacoes', 'text', ['comment' => 'Observações sobre a liminar', 'null' => true])
            ->addColumn('responsavelCadastramentoId', 'string', ['comment' => 'Matrícula do responsável pelo cadastramento da liminar', 'limit' => 7])
            ->addColumn('responsavelCadastramentoNome', 'string', ['comment' => 'Nome do responsável pelo cadastramento da liminar'])
            ->addColumn('responsavelCadastramentoUnidadeId', 'integer', ['comment' => 'Id da unidade de lotação física do responsável pelo cadastramento da liminar'])
            ->addColumn('responsavelCadastramentoUnidadeSigla', 'string', ['comment' => 'Sigla da unidade de lotação física do responsável pelo cadastramento da liminar'])
            ->addColumn('responsavelAtesteId', 'string', ['comment' => 'Matrícula do responsável pelo ateste da liminar', 'limit' => 7, 'null' => true])
            ->addColumn('responsavelAtesteNome', 'string', ['comment' => 'Nome do responsável pelo ateste da liminar', 'null' => true])
            ->addColumn('responsavelAtesteUnidadeId', 'integer', ['comment' => 'Id da unidade de lotação física do responsável pelo ateste da liminar', 'null' => true])
            ->addColumn('responsavelAtesteUnidadeSigla', 'string', ['comment' => 'Sigla da unidade de lotação física do responsável pelo ateste da liminar', 'null' => true])
            ->addColumn('fimVigencia', 'date', ['comment' => 'Data em que a liminar deixou de vigorar', 'null' => true])
            ->addTimestamps()
            ->create();
    }
}
