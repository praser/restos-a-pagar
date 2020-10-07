export const setDefaults = api => {
  return {
    unidade: api.defaults.unidade,
    gestor: api.defaults.gestor,
    tipoInfo: api.defaults.tipoInfo,
    unidades: [api.defaults.unidade],
    gestores: [api.defaults.gestor],
  };
};

export const calcExecutionYear = budgetYear => parseInt(budgetYear, 10) + 2;

export const getRequests = (api, budgetYear) => {
  return [
    api.requests.getUnidades(),
    api.requests.getGestores(),
    api.requests.getTiposInformacoes({
      anoExecucao: calcExecutionYear(budgetYear),
    }),
  ];
};

export const formatData = (api, res) => ({
  unidades: api.formatters.unidades(res[0].data),
  gestores: api.formatters.gestores(res[1].data),
  tiposInfo: api.formatters.tiposInfo(res[2].data),
});

export const initialState = {
  unidade: {},
  gestor: {},
  tipoInfo: {},
  unidades: [],
  gestores: [],
  tiposInfo: [],
};
