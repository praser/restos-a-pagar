import getXhrClient from '~/utils/xhrClient';

const requests = async () => {
  const client = await getXhrClient(process.env.REACT_APP_RAP_API_URL);

  const getGestores = async () => client.get('/ug/gestores');

  const getParams = async () => client.get('/parametros');

  const getTiposInformacoes = async args => {
    const { anoExecucao } = args;
    return client.get(`/tipos-informacoes/${anoExecucao}`);
  };

  const getUnidades = async () => client.get('/unidades');

  const getOperacoesPreBloqueio = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    return client.get(
      `/operacoes/passiveis-bloqueio/${anoExecucao}/${tipoInfo}?unidadeId=${unidadeId}&siglaGestor=${siglaGestor}`,
    );
  };

  const getUgs = async () => client.get('/ug');

  const postUg = async args => {
    const { ug } = args;
    return client.post('/ug', { ug });
  };

  const getUg = async id => {
    return client.get(`/ug/${id}`);
  };

  const putUg = async (id, ug) => {
    return client.put(`/ug/${id}`, { ug });
  };

  return {
    getGestores,
    getOperacoesPreBloqueio,
    getParams,
    getTiposInformacoes,
    getUgs,
    postUg,
    putUg,
    getUg,
    getUnidades,
  };
};

export default requests;
