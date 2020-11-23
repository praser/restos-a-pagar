import React, { useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Card, CardBody, CardHeader } from '~/components/Card';
import { Heading, Row } from '~/components/Layout';
import Layout from '~/components/Layout/Internal';
import { Context } from '~/components/Store';
import { PageTitle } from '~/components/Tipography';

import { useApiRap, useXHR } from '~/hooks';
import { formatAsISO } from '~/utils/dates';

import {
  createLiminarFail as alertProps,
  createLiminarSuccess,
} from '~/utils/messages';
import { ugPath } from '~/utils/paths';

import Form from './Form';

const issuanceDate = new Date();
issuanceDate.setHours(0, 0, 0, 0);

const initialValues = {
  code: '',
  name: '',
  issuanceDate,
  injunctionDigitalization: '',
  siarg: '',
  notes: '',
  contracts: [],
};

const Create = () => {
  const [isSending, setIsSending] = useState(false);
  const dispatch = useContext(Context)[1];
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const history = useHistory();

  const handleSuccess = () => {
    const { title, text } = createLiminarSuccess;
    dispatch({ type: 'SET_ALERT', payload: { visible: true, title, text } });
    history.goBack();
  };

  const sendRequest = useCallback(
    async values => {
      if (isSending) return;
      setIsSending(true);
      await apiRap.then(api => {
        doAllXhrRequest({
          alertProps,
          requests: [api.requests.postLiminar(values)],
          success: handleSuccess,
        });
      });
      setIsSending(false);
    },
    [isSending],
  );

  const handleSubmit = values => {
    const {
      code: processo,
      name: requerente,
      issuanceDate,
      injunctionDigitalization: liminar,
      siarg,
      notes: observacoes,
      contracts: operacoes,
    } = values;

    const payload = {
      processo,
      requerente,
      dataDecisao: formatAsISO(issuanceDate),
      liminar,
      siarg,
      observacoes,
      operacoes,
    };

    sendRequest({ payload });
  };

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>Cadastrar liminar judicial</PageTitle>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados da liminar judicial</CardHeader>
          <CardBody>
            <Form initialValues={initialValues} onSubmit={handleSubmit} />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Create;
