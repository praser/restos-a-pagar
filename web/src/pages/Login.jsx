import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
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
import { Alert, Loading } from '~/components/Dialog';

import { authenticate } from '~/utils/authApi';
import { login } from '~/utils/login';
import { homePath } from '~/utils/paths';

import image from '~/assets/undraw_Login_v483.svg';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleUsernameChange = event => setUsername(event.target.value);

  const handlePasswordChange = event => setPassword(event.target.value);

  const handleGoToSudep = event => {
    event.preventDefault();
    window.location.href = process.env.REACT_APP_MAIN_PORTAL;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await authenticate(username, password);
      login(res.data.token);
    } catch {
      setAlert(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
        history.push(homePath);
      }, 500);
    }
  };

  const handleAlertConfirm = event => {
    event.preventDefault();
    setAlert(false);
  };

  return (
    <Container>
      <Loading visible={loading} title="Carregando..." />
      <Alert
        visible={alert}
        title="Ops..."
        text="Login e senha inválidos"
        onConfirm={handleAlertConfirm}
      />
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
