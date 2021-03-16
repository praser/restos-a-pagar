export const setDefaults = (api, currentUser) => {
  return {
    unidade: api.defaults.unidade(currentUser),
    gestor: api.defaults.gestor,
    tipoInfo: api.defaults.tipoInfo,
    unidades: [api.defaults.unidade],
    gestores: [api.defaults.gestor],
  };
};

export const getRequests = (api, executionYear) => {
  return [
    api.requests.getUnidades(),
    api.requests.getGestores(),
    api.requests.getTiposInformacoes({
      anoExecucao: executionYear,
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
