import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from 'components/Layout/Internal';
import { Code, Description, GoBack, Paragraph } from './styles';

const Error = ({ code, description, paragraph }) => {
  const history = useHistory();

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <Layout>
      <Code>{code}</Code>
      <Description>{description}</Description>
      <Paragraph>{paragraph}</Paragraph>
      <GoBack onClick={handleGoBack}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} /> Voltar para a página
        anterior
      </GoBack>
    </Layout>
  );
};

export default Error;
