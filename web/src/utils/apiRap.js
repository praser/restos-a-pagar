/* eslint-disable no-underscore-dangle */
import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { getToken } from './login';

const maxAge = parseInt(process.env.REACT_APP_LOCAL_CACHE_MAX_AGE);

const configure = async () => {
  await localforage.defineDriver(memoryDriver);

  const store = localforage.createInstance({
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver,
    ],
    name: 'local-cache',
  });

  const cache = (() => {
    if (maxAge) {
      return {
        maxAge: maxAge,
        store,
      };
    }
    return {};
  })();

  return setup({
    baseURL: process.env.REACT_APP_RAP_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Token': getToken(),
    },
    cache,
  });
};

export const getParams = () => {
  return configure().then(async client => client.get('/parametros'));
};

export const getUnidades = () => {
  return configure().then(async client => client.get('/unidades'));
};

export const getGestores = () => {
  return configure().then(async client => client.get('/ug/gestores'));
};

export const getTiposInformacoes = anoExecucao => {
  return configure().then(async client =>
    client.get(`/tipos-informacoes/${anoExecucao}`),
  );
};
