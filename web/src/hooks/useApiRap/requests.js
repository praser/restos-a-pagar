import { isNull, pickBy } from 'lodash';

import getXhrClient from '~/utils/xhrClient';

const search = params => {
  const query = pickBy(params, value => !isNull(value));
  const urlSearchParams = new URLSearchParams(query);
  return `?${urlSearchParams.toString()}`;
};

const requests = async () => {
  const client = await getXhrClient(process.env.REACT_APP_RAP_API_URL);

  const getEstatisticasPreBloqueio = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    const path = `/estatisticas/${anoExecucao}/passiveis-bloqueio`;
    const query = search({ unidadeId, siglaGestor, tipoInfo });
    return client.get(`${path}${query}`);
  };

  const getEstatisticasBloqueio = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    const path = `/estatisticas/${anoExecucao}/bloqueio`;
    const query = search({ unidadeId, siglaGestor, tipoInfo });
    return client.get(`${path}${query}`);
  };

  const getEstatisticasBloqueioSnapshot = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    const path = `/estatisticas/${anoExecucao}/bloqueio/snapshot`;
    const query = search({ unidadeId, siglaGestor, tipoInfo });
    return client.get(`${path}${query}`);
  };

  const getGestores = async () => client.get('/ug/gestores');

  const getParams = async () => client.get('/parametros');

  const getTiposInformacoes = async args => {
    const { anoExecucao } = args;
    return client.get(`/tipos-informacoes/${anoExecucao}`);
  };

  const getUnidades = async () => client.get('/unidades');

  const getOperacoes = async () => {
    const path = '/operacoes';
    return client.get(path);
  };

  const getOperacoesPreBloqueio = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    const path = `/operacoes/${anoExecucao}/passiveis-bloqueio`;
    const query = search({ unidadeId, siglaGestor, tipoInfo });
    return client.get(`${path}${query}`);
  };

  const getOperacoesBloqueio = async args => {
    const { anoExecucao, tipoInfo, unidadeId, siglaGestor } = args;
    const path = `/operacoes/${anoExecucao}/bloqueio`;
    const query = search({ unidadeId, siglaGestor, tipoInfo });
    return client.get(`${path}${query}`);
  };

  const getNotasEmpenhoAptasDesbloqueio = async args => {
    const { anoOrcamentario } = args;
    const path = `/notas-empenho/${anoOrcamentario}/aptas-desbloqueio`;
    return client.get(path);
  };

  const getUgs = async () => client.get('/ug');

  const postUg = async args => {
    const { ug } = args;
    return client.post('/ug', { ug });
  };

  const getUg = async id => client.get(`/ug/${id}`);

  const putUg = async (id, ug) => client.put(`/ug/${id}`, { ug });

  const deleteUg = async id => client.delete(`/ug/${id}`);

  const getStatus = () => client.get('/info');

  const postSaldoNe = async args => {
    const { payload } = args;
    return client.post('/notas-empenho/saldo', { ...payload });
  };

  const postLoteDesbloqueio = async args => {
    const { payload } = args;
    return client.post('/notas-empenho/lotes-desbloqueio', { ...payload });
  };

  const postLoteDesbloqueioLiminar = async args => {
    const { payload } = args;
    return client.post('/notas-empenho/lotes-desbloqueio/liminar', {
      ...payload,
    });
  };

  const postLiminar = async args => {
    const { payload } = args;
    return client.post('/liminares', { ...payload });
  };

  const getLiminares = async () => client.get('/liminares');

  const getEmpenhosLiminar = async liminarId =>
    client.get(`/notas-empenho/liminar/${liminarId}`);

  const putLiminarCheck = async liminarId =>
    client.put(`/liminares/${liminarId}/check`);

  return {
    deleteUg,
    getEmpenhosLiminar,
    getEstatisticasPreBloqueio,
    getEstatisticasBloqueio,
    getEstatisticasBloqueioSnapshot,
    getGestores,
    getLiminares,
    getOperacoes,
    getOperacoesBloqueio,
    getOperacoesPreBloqueio,
    getNotasEmpenhoAptasDesbloqueio,
    getParams,
    getStatus,
    getTiposInformacoes,
    getUg,
    getUgs,
    getUnidades,
    postLiminar,
    postLoteDesbloqueio,
    postLoteDesbloqueioLiminar,
    postSaldoNe,
    postUg,
    putLiminarCheck,
    putUg,
  };
};

export default requests;
