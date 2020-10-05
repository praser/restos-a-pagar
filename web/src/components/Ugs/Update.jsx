import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from './Form';
import Layout from '../Layout/Internal';
import { Heading } from '../Layout';
import { Card, CardBody, CardHeader } from '../Card';
import { useApiRap, useXHR } from '~/hooks';
import { updateUgFail as alertProps, updateUgSuccess } from '~/utils/messages';
import { ugPath } from '~/utils/paths';
import { Context } from '../Store';
import { PageTitle } from '../Tipography';

const initialState = {
  isSending: false,
  ug: {
    id: '',
    created_at: '',
    updated_at: '',
    codigo: '',
    nome: '',
    nomeGestor: '',
    siglaGestor: '',
  },
};

const Update = () => {
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const dispatch = useContext(Context)[1];
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const { isSending } = state;
  const history = useHistory();

  const handleLoadUg = res => {
    const ug = res[0].data;
    setState(prev => ({ ...prev, ug }));
  };

  useEffect(() => {
    apiRap.then(api => {
      doAllXhrRequest({
        alertProps,
        requests: [api.requests.getUg(id)],
        success: handleLoadUg,
      });
    });
  }, [id]);

  const handleSuccess = () => {
    const { title, text } = updateUgSuccess;
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
          requests: [api.requests.putUg(id, values)],
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
    sendRequest(ug);
  };

  const initialValues = {
    code: state.ug.codigo,
    name: state.ug.nome,
    managerAbbreviation: state.ug.siglaGestor,
    managerName: state.ug.nomeGestor,
  };

  return (
    <Layout>
      <Heading>
        <PageTitle>Cadastrar Unidade Gestora</PageTitle>
      </Heading>
      <Card>
        <CardHeader>Dados da unidade gestora</CardHeader>
        <CardBody>
          <Form initialValues={initialValues} onSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Update;
