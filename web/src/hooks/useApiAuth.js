import getXhrClient from '../utils/xhrClient';

const useApiAuth = async () => {
  const client = await getXhrClient(process.env.REACT_APP_AUTH_API_URL, false);

  const postAuthenticate = async () => {
    const req = await fetch('http://localhost:2004/sistemas/user');
    const json = await req.json();
    const { id: username } = json;
    return client.post('/authenticate/username', { username });
  };

  return { requests: { postAuthenticate } };
};

export default useApiAuth;
