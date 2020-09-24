import axios from 'axios';
import { getToken } from './login';

const options = {
  baseURL: process.env.REACT_APP_RAP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Token': getToken(),
  },
};

const client = axios.create(options);

export const getParams = async () => {
  return client.get('/parametros');
};
