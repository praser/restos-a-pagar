import React, { useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from 'components/Layout/Internal';
import { Heading, Row } from 'components/Layout';
import { Card, CardBody, CardHeader } from 'components/Card';
import { useApiRap, useXHR } from 'hooks';
import { createUgFail as alertProps, createUgSuccess } from 'utils/messages';
import { ugPath } from 'utils/paths';
import { Context } from 'components/Store';
import { PageTitle } from 'components/Tipography';
import Form from './Form';

const initialValues = {
  code: '',
  name: '',
  managerAbbreviation: '',
  managerName: '',
};

const initialState = {
  isSending: false,
};

const Create = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useContext(Context)[1];
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const { isSending } = state;
  const history = useHistory();

  const handleSuccess = () => {
    const { title, text } = createUgSuccess;
    dispatch({ type: 'SET_ALERT', payload: { visible: true, title, text } });
    history.push(ugPath);
  };

  const sendRequest = useCallback(
    async values => {
      if (isSending) return;
      setState(prev => ({ ...prev, isSending: true }));
      await apiRap.then(api => {
        doAllXhrRequest({
          alertProps,
          requests: [api.requests.postUg(values)],
          success: handleSuccess,
        });
      });
      setState(prev => ({ ...prev, isSending: false }));
    },
    [isSending],
  );

  const handleSubmit = values => {
    const ug = {
      codigo: values.code,
      nome: values.name,
      siglaGestor: values.managerAbbreviation,
      nomeGestor: values.managerName,
    };
    sendRequest({ ug });
  };

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>Cadastrar Unidade Gestora</PageTitle>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados da unidade gestora</CardHeader>
          <CardBody>
            <Form initialValues={initialValues} onSubmit={handleSubmit} />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Create;
