import getXhrClient from './xhrClient';

const xhrClient = (async () => {
  return await getXhrClient(process.env.REACT_APP_RAP_API_URL, false);
})();

export const getParams = async () => {
  const client = await xhrClient;
  return client.get('/parametros');
};

export const getUnidades = async () => {
  const client = await xhrClient;
  return client.get('/unidades');
};

export const getTiposInformacoes = async anoExecucao => {
  const client = await xhrClient;
  return client.get(`/tipos-informacoes/${anoExecucao}`);
};

export const getGestores = async () => {
  const client = await xhrClient;
  return client.get('/ug/gestores');
};
