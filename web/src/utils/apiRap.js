/* eslint-disable no-underscore-dangle */
import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { getToken } from './login';

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

  return setup({
    baseURL: process.env.REACT_APP_RAP_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Token': getToken(),
    },
    cache: {
      maxAge: process.env.REACT_APP_LOCAL_CACHE_MAX_AGE,
      store,
    },
  });
};

export const getParams = () => {
  return configure().then(async client => client.get('/parametros'));
};
