import Axios from 'axios';

import { getToken } from './jwt';

export interface IResponse {
  data: any;
}

const timeout = 0;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Token': getToken(),
};
const options = {
  timeout,
  headers,
};

const getXhrClient = (baseURL: any) => {
  options.headers['X-Token'] = getToken();
  return Axios.create({ baseURL, ...options });
};

export default getXhrClient;
