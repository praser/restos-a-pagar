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
} from '../../components/Layout/External';

import image from '~/assets/undraw_Login_v483.svg';

import {
  handleGoToSudepClick,
  handlePasswordChange,
  handleSubmit,
  handleUsernameChange,
} from './handlers';

const initialState = {
  username: '',
  password: '',
};

const Login = ({ setLoading, setAlert }) => {
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const apiAuth = useApiAuth();

  return (
    <Container>
      <Content>
        <LoginImage src={image} />
        <Form>
          <Title>Bem vindo de volta!</Title>
          <Input
            type="text"
            placeholder="Digite a sua matrícula"
            onChange={event => handleUsernameChange(event, setState)}
            value={state.username}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha"
            onChange={event => handlePasswordChange(event, setState)}
            value={state.password}
          />
          <ButtonPrimary
            onClick={event =>
              handleSubmit(event, {
                apiAuth,
                history,
                setAlert,
                setLoading,
                state,
              })
            }
          >
            Login
          </ButtonPrimary>
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
