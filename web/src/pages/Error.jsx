import React from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '~/components/Layout/Internal';
import {
  Code,
  Container,
  Description,
  GoBack,
  Paragraph,
} from '~/components/Error';

const Error = ({ code, description }) => {
  const history = useHistory();

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <Layout>
      <Container>
        <Code>{code}</Code>
        <Description>{description}</Description>

        <Paragraph>Parece que você encontrou um buraco na Matrix...</Paragraph>
        <GoBack onClick={handleGoBack}>← Voltar para a página anterior</GoBack>
      </Container>
    </Layout>
  );
};

export default Error;
