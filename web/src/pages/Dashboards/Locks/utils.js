import {
  unidade as defUnidade,
  gestor as defGestor,
} from 'hooks/useApiRap/defaults';

export const initialState = currentUser => ({
  showFilters: false,
  unidade: defUnidade(currentUser),
  gestor: defGestor,
  tipoInfo: {
    value: 1,
    label: 'Todas as operações',
  },
  status: {
    databasePosition: null,
  },
  estatisticas: [
    {
      data: null,
      quantidadeOperacoes: 0,
      quantidadeDocumentos: 0,
      saldoBloqueado: 0,
      saldoDesbloqueado: 0,
      saldoAguardandoDesbloqueio: 0,
    },
  ],
  snapshots: [
    {
      data: null,
      quantidadeOperacoes: 0,
      quantidadeDocumentos: 0,
      saldoBloqueado: 0,
      saldoDesbloqueado: 0,
      saldoAguardandoDesbloqueio: 0,
    },
  ],
});

export const dataInitialState = {
  operacoes: [{}],
  operacoesCsv: [{}],
};
