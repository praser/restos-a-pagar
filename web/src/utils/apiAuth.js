import { setup } from 'axios-cache-adapter';

const options = {
  baseURL: process.env.REACT_APP_AUTH_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const client = setup(options);

export const postAuthenticate = async (username, password) => {
  return client.post('/authenticate', {
    credentials: { username, password },
  });
};
