import React, { useState, useCallback, useContext } from 'react';
import { Container } from '~/components/Layout';
import {
  Content,
  LoginImage,
  Form,
  Title,
  Input,
  ButtonPrimary,
  ButtonDanger,
  Divider,
  Link,
} from '../components/Layout/External';
import { useApiAuth, useXHR } from '~/hooks';
import { setToken } from '~/utils/jwt';
import { loginFail as alertProps } from '~/utils/messages';
import { Context } from '~/Store';

import image from '~/assets/undraw_Login_v483.svg';

const initialState = {
  username: '',
  password: '',
  isSending: false,
};

const Login = () => {
  const dispatch = useContext(Context)[1];
  const [state, setState] = useState(initialState);
  const apiAuth = useApiAuth();
  const { doAllXhrRequest } = useXHR();
  const { username, password, isSending } = state;

  const handleUsernameChange = event => {
    const { value } = event.target;
    setState(prev => ({ ...prev, username: value }));
  };

  const handlePasswordChange = event => {
    const { value } = event.target;
    setState(prev => ({ ...prev, password: value }));
  };

  const handleGoToSudepClick = event => {
    event.preventDefault();
    window.location.href = process.env.REACT_APP_MAIN_PORTAL;
  };

  const handleSuccess = res => {
    const { token } = res[0].data;
    setToken(token);
    dispatch({ type: 'SET_JWT', payload: token });
  };

  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setState(prev => ({ ...prev, isSending: true }));
    await apiAuth.then(api => {
      doAllXhrRequest({
        alertProps,
        requests: [api.requests.postAuthenticate(username, password)],
        success: handleSuccess,
      });
    });
    setState(prev => ({ ...prev, isSending: false }));
  }, [username, password, isSending]);

  const handleSubmit = event => {
    event.preventDefault();
    sendRequest();
  };

  return (
    <Container>
      <Content>
        <LoginImage src={image} />
        <Form>
          <Title>Bem vindo de volta!</Title>
          <Input
            type="text"
            placeholder="Digite a sua matrícula"
            onChange={handleUsernameChange}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            onChange={handlePasswordChange}
          />
          <ButtonPrimary onClick={handleSubmit}>Login</ButtonPrimary>
          <Divider />
          <ButtonDanger onClick={handleGoToSudepClick}>
            Ir para a página da SUDEP
          </ButtonDanger>
          <Divider />
          <Link
            href={`mailto:${process.env.REACT_APP_TECHNICAL_SUPPORT_MAIL}?cc=${process.env.REACT_APP_MANGER_AREA_MAIL}&subject=Não consigo acessar o painel do RAP`}
          >
            Não consegue acessar?
          </Link>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
