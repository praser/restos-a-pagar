/* eslint-disable no-underscore-dangle */
import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { getToken } from './jwt';

const maxAge = parseInt(process.env.REACT_APP_LOCAL_CACHE_MAX_AGE, 10);
const timeout = 5000;
const cacheName = 'local-cache';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Token': getToken(),
};
const options = {
  timeout,
  headers,
};

const configure = async baseURL => {
  await localforage.defineDriver(memoryDriver);

  const store = localforage.createInstance({
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver,
    ],
    name: cacheName,
  });

  const cache = (() => {
    if (maxAge) {
      return {
        maxAge,
        store,
      };
    }
    return {};
  })();

  return setup({
    baseURL,
    cache,
    ...options,
  });
};

const getXhrClient = (baseURL, cache = true) => {
  if (cache) {
    return configure(baseURL).then(async client => client);
  }

  return setup({ baseURL, ...options });
};

export default getXhrClient;
