import {
  unidade as defUnidade,
  gestor as defGestor,
  tipoInfo as defTipoInfo,
} from '~/hooks/useApiRap/defaults';

export const initialState = currentUser => ({
  showFilters: false,
  unidade: defUnidade(currentUser),
  gestor: defGestor,
  tipoInfo: defTipoInfo,
  status: {
    databasePosition: null,
  },
  parametros: {
    dataBloqueio: null,
  },
  estatisticas: {
    estatisticas: [
      {
        quantidade_operacoes: null,
        saldo_notas_empenho: null,
      },
    ],
    estatisticasPorGestor: [
      {
        siglaGestor: '',
        saldo_notas_empenho: 0,
      },
    ],
  },
});

export const dataInitialState = {
  operacoes: [{}],
  operacoesCsv: [{}],
};
