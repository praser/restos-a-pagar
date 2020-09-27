import getXhrClient from '../utils/xhrClient';

const useApiRap = async () => {
  const client = await getXhrClient(process.env.REACT_APP_RAP_API_URL);

  const getGestores = async () => client.get('/ug/gestores');
  const getParams = async () => client.get('/parametros');
  const getTiposInformacoes = async anoExecucao =>
    client.get(`/tipos-informacoes/${anoExecucao}`);
  const getUnidades = async () => client.get('/unidades');

  return { getGestores, getParams, getTiposInformacoes, getUnidades };
};

export default useApiRap;
