import React, { useCallback, useState } from 'react';
import Form from './Form';
import Layout from '../Layout/Internal';
import { Heading } from '../Layout';
import { Card, CardBody, CardHeader } from '../Card';
import { useApiRap, useXHR } from '~/hooks';
import { crateUgFail as alertProps } from '~/utils/messages';

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
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const { isSending } = state;

  const handleSuccess = () => {
    // deve redirecionar
    alert('sucesso');
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
      <Heading>Cadastrar Unidade Gestora</Heading>
      <Card>
        <CardHeader>Dados da unidade gestora</CardHeader>
        <CardBody>
          <Form initialValues={initialValues} onSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Create;
