import getXhrClient from './xhrClient';

const xhrClient = (async () => {
  return await getXhrClient(process.env.REACT_APP_AUTH_API_URL);
})();

export const postAuthenticate = async (username, password) => {
  const client = await xhrClient;
  return client.post('/authenticate', {
    credentials: { username, password },
  });
};
