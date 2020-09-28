import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useApiAuth } from '~/hooks';

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

import { login } from '~/utils/login';
import { homePath } from '~/utils/paths';

import image from '~/assets/undraw_Login_v483.svg';

const Login = ({ setLoading, setAlert }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const apiAuth = useApiAuth();

  const handleUsernameChange = event => setUsername(event.target.value);

  const handlePasswordChange = event => setPassword(event.target.value);

  const handleGoToSudep = event => {
    event.preventDefault();
    window.location.href = process.env.REACT_APP_MAIN_PORTAL;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    apiAuth.then(api => {
      setLoading(true);
      api.requests
        .postAuthenticate(username, password)
        .then(res => login(res.data.token))
        .catch(() => setAlert(true))
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
            history.push(homePath);
          }, 500),
        );
    });
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
            value={username}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            onChange={handlePasswordChange}
            value={password}
          />
          <ButtonPrimary onClick={handleSubmit}>Login</ButtonPrimary>
          <Divider />
          <ButtonDanger onClick={handleGoToSudep}>
            Ir para a página da SUDEP{' '}
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
