import getXhrClient from '../utils/xhrClient';

const useApiAuth = async () => {
  const client = await getXhrClient(process.env.REACT_APP_AUTH_API_URL, false);

  return {
    postAuthenticate: async (username, password) => {
      return client.post('/authenticate', {
        credentials: { username, password },
      });
    },
  };
};

export default useApiAuth;
