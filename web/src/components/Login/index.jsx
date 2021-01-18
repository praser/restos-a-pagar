// Capturar a matricula do usuário logado
// disparar uma requisição para o login sem senha
// Caso a autenticaçaõ seja finalizada com sucesso gravar o token na store e no session storage

import { useApiAuth, useXHR } from 'hooks';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { setToken } from 'utils/jwt';
import { loginFail as alertProps } from 'utils/messages';
import { Context } from '../Store';

const Login = () => {
  const dispatch = useContext(Context)[1];
  const [isSending, setIsSending] = useState(false);
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
