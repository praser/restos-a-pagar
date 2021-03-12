import { useApiAuth, useXHR } from 'hooks';
import React, { useCallback, useContext, useEffect } from 'react';

import { setToken } from 'utils/jwt';
import { loginFail as alertProps } from 'utils/messages';
import { Context } from '../Store';

const Login = () => {
  const dispatch = useContext(Context)[1];
  const apiAuth = useApiAuth();
  const { doAllXhrRequest } = useXHR();

  const handleSuccess = res => {
    const { token } = res[0].data;
    setToken(token);
    dispatch({ type: 'SET_JWT', payload: token });
  };

  const sendRequest = useCallback(async () => {
    const api = await apiAuth;
    doAllXhrRequest({
      alertProps,
      requests: [api.requests.postAuthenticate()],
      success: handleSuccess,
    });
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return <></>;
};

export default Login;
