<?php

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\EmpenhoDomain;

class SituacaoEmpenhoDao extends DaoBase
{
    protected const TABLE = 'cache.situacao_empenhos';
    protected $domain = EmpenhoDomain::class;

    public function findBySituacao(int $anoExecucao, string $situacao): array
    {
        return $this->findAllBy([
            ['COLUMN' => EmpenhoDomain::ANO_EXECUCAO, 'VALUE' => $anoExecucao],
            ['COLUMN' => EmpenhoDomain::SITUACAO, 'VALUE' => $situacao]
        ]);
    }
}
