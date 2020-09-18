import React from 'react';

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
import image from '../../assets/undraw_Login_v483.svg';

export const Login = () => {
  return (
    <Container>
      <Content>
        <LoginImage src={image} />
        <Form>
          <Title>Bem vindo de volta!</Title>
          <Input type="text" placeholder="Digite a sua matrícula" />
          <Input type="password" placeholder="Digite a sua senha" />
          <ButtonPrimary>Login</ButtonPrimary>
          <Divider />
          <ButtonDanger>Ir para a página da SUDEP </ButtonDanger>
          <Divider />
          <Link href={process.env.PAGINA_SUDEP}>Não consegue acessar?</Link>
        </Form>
      </Content>
    </Container>
  );
};
