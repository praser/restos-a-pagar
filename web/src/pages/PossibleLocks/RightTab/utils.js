import { doAllXhrRequest } from '~/utils/xhr';
import { possibleLocksFilters as alertProps } from '~/utils/messages';

const setDefaults = api => {
  return {
    unidade: api.defaults.unidade,
    gestor: api.defaults.gestor,
    tipoInfo: api.defaults.tipoInfo,
    unidades: [api.defaults.unidade],
    gestores: [api.defaults.gestor],
  };
};

const calcExecutionYear = budgetYear => parseInt(budgetYear, 10) + 2;

const getRequests = (api, budgetYear) => {
  return [
    api.requests.getUnidades(),
    api.requests.getGestores(),
    api.requests.getTiposInformacoes({
      anoExecucao: calcExecutionYear(budgetYear),
    }),
  ];
};

const formatData = (api, res) => ({
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

export const fetchData = args => {
  const { apiRap, budgetYear, setLoading, setAlert, setState } = args;
  return apiRap
    .then(api => {
      setState(prev => ({ ...prev, ...setDefaults(api) }));
      return api;
    })
    .then(api => {
      const success = res => {
        const data = formatData(api, res);
        setState(prev => ({ ...prev, ...data }));
      };

      return doAllXhrRequest({
        requests: getRequests(api, budgetYear),
        setLoading,
        setAlert,
        alertProps,
        success,
      });
    });
};
