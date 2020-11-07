<?php
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Persistence;

use App\Domain\OperacaoDomain;
use Exception;

class OperacaoDao extends DaoBase
{
    protected const TABLE = 'operacoes';
    protected $domain = OperacaoDomain::class;

    public function operacoesComNotasEmpenhosPassiveisBloqueio(int $tipoInformacaoId, int $anoExecucao, int $unidadeId = null, string $gestorSigla = null): ?array
    {
            try {
            // TODO: Os parâmetros desta consulta devem se tornar dinâmicos em uma implementação futura
            $qb = $this->getQueryBuilder();
            $query = $qb
                ->select('cache.operacoes_com_ne_passiveis_de_bloqueio')
                ->where()
                ->equals(OperacaoDomain::ANO_EXECUCAO, $anoExecucao);

            if ($tipoInformacaoId === 2) {
                $query->isNotNull(OperacaoDomain::DATA_CUMPRIMENTO_CRITERIOS_DESBLOQUEIO);
            } elseif ($tipoInformacaoId === 3) {
                $query->isNull(OperacaoDomain::DATA_CUMPRIMENTO_CRITERIOS_DESBLOQUEIO);
            }

            if ($unidadeId) {
                $query->equals(OperacaoDomain::GIGOV_ID, $unidadeId);
            }

            if ($gestorSigla) {
                $query->equals(OperacaoDomain::SIGLA_GESTOR, $gestorSigla);
            }

            $statment = $this->getConnection()->prepare($qb->write($query->end()));
            $statment->execute($qb->getValues());

            return $this->inflateDomains($statment);
        } catch (Exception $ex) {
            $this->exceptionHandler($ex);
        }

        return null;
    }
}
