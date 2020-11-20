<?php

use Phinx\Migration\AbstractMigration;

class AlterLotesDesbloqueio1 extends AbstractMigration
{
    public function up(): void
    {
        $query = <<<SQL
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN sequencial INT NULL
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN ano INT NULL
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN situacao NVARCHAR(255) NULL
            ALTER TABLE lotes_desbloqueio
            ADD CONSTRAINT df_lote_desbloqueio_sequencial
            DEFAULT (NEXT VALUE FOR lote_desbloqueio_sequence) FOR sequencial
            ALTER TABLE lotes_desbloqueio
            ADD CONSTRAINT df_lote_desbloqueio_ano
            DEFAULT YEAR(GETDATE()) FOR ano
            ALTER TABLE lotes_desbloqueio
            ADD CONSTRAINT df_lote_desbloqueio_situacao
            DEFAULT 'AGUARDANDO PROCESSAMENTO' FOR situacao
        SQL;

        $this->execute($query);
    }
    
    public function down(): void
    {
        $query = <<<SQL
            DROP INDEX [ix_sequencial_ano] ON [dbo].[lotes_desbloqueio]
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN sequencial INT NOT NULL
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN ano INT NOT NULL
            ALTER TABLE lotes_desbloqueio
            ALTER COLUMN situacao NVARCHAR(255) NOT NULL
            ALTER TABLE lotes_desbloqueio
            DROP CONSTRAINT df_lote_desbloqueio_sequencial
            ALTER TABLE lotes_desbloqueio
            DROP CONSTRAINT df_lote_desbloqueio_ano
            ALTER TABLE lotes_desbloqueio
            DROP CONSTRAINT df_lote_desbloqueio_situacao
            CREATE UNIQUE NONCLUSTERED INDEX [ix_sequencial_ano] ON [dbo].[lotes_desbloqueio]
            (
                [sequencial] ASC,
                [ano] ASC
            )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
        SQL;

        $this->execute($query);
    }
}