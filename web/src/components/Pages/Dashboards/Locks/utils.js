import {
  unidade as defUnidade,
  gestor as defGestor,
  tipoInfo as defTipoInfo,
} from '~/hooks/useApiRap/defaults';

export const initialState = {
  showFilters: false,
  unidade: defUnidade,
  gestor: defGestor,
  tipoInfo: defTipoInfo,
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
};
