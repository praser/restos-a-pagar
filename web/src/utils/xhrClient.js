import Axios from 'axios';

import { getToken } from './jwt';

const timeout = 10000;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Token': getToken(),
};
const options = {
  timeout,
  headers,
};

const getXhrClient = baseURL => {
  options.headers['X-Token'] = getToken();
  return Axios.create({ baseURL, ...options });
};

export default getXhrClient;
