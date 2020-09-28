import getXhrClient from '../utils/xhrClient';

const useApiRap = async () => {
  const client = await getXhrClient(process.env.REACT_APP_RAP_API_URL);

  const getGestores = async () => client.get('/ug/gestores');
  const getParams = async () => client.get('/parametros');
  const getTiposInformacoes = async anoExecucao =>
    client.get(`/tipos-informacoes/${anoExecucao}`);
  const getUnidades = async () => client.get('/unidades');

  const defaults = {
    unidade: { value: null, label: 'Todas as GIGOV/REGOV' },
    gestor: { value: null, label: 'Todos os gestores' },
    tipoInfo: {
      value: 3,
      label: 'Operações que ainda não cumpriram os critérios de desbloqueio',
    },
  };

  const formatters = {
    unidades: unidades => {
      const arr = unidades.map(unidade => {
        const { id: value, nome: label } = unidade;
        return { value, label };
      });

      arr.splice(0, 0, defaults.unidade);
      return arr;
    },

    gestores: gestores => {
      const arr = gestores.map(gestor => {
        const { siglaGestor: value, nomeGestor } = gestor;
        return { value, label: `${value} - ${nomeGestor}` };
      });

      arr.splice(0, 0, defaults.gestor);
      return arr;
    },

    tiposInfo: tipos => {
      return tipos.map(tipo => {
        const {
          tipoInformacaoId: value,
          tipoInformacaoDescricao: label,
        } = tipo;
        return { value, label };
      });
    },
  };

  return {
    requests: {
      getGestores,
      getParams,
      getTiposInformacoes,
      getUnidades,
    },
    defaults,
    formatters,
  };
};

export default useApiRap;
