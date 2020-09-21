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
} from './styles';
import { login } from '../../utils/login';
import { routes } from '../../utils/routes';
import image from '../../assets/undraw_Login_v483.svg';

export const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const handleUsernameBlur = event => setUsername(event.target.value);
  const handlePasswordBlur = event => setPassword(event.target.value);

  const handleLoginClick = async event => {
    event.preventDefault();
    await login(username, password);
    history.push(routes.home);
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
            onBlur={handleUsernameBlur}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            onBlur={handlePasswordBlur}
          />
          <ButtonPrimary onClick={handleLoginClick}>Login</ButtonPrimary>
          <Divider />
          <ButtonDanger>Ir para a página da SUDEP </ButtonDanger>
          <Divider />
          <Link href={process.env.REACT_APP_MAIN_PORTAL}>
            Não consegue acessar?
          </Link>
        </Form>
      </Content>
    </Container>
  );
};
