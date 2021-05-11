import {
  faFolderOpen,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useCallback, useContext, useRef, useState } from 'react';

import DatePicker from 'react-datepicker';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { CSVReader } from 'react-papaparse';

import { v4 as uuidv4 } from 'uuid';

import { isNull, first } from 'lodash';

import { useHistory } from 'react-router-dom';

import { SmallButtonPrimary } from 'components/Button';
import { Card, CardBody, CardHeader } from 'components/Card';
import { Field, FormGroup, FormRow, Input, Label } from 'components/Form';
import { Heading, Row } from 'components/Layout';
import { Context } from 'components/Store';
import { PageTitle } from 'components/Tipography';
import Layout from 'components/Layout/Internal';

import { useCurrentUser, useApiRap, useXHR } from 'hooks';
import { DataTable } from 'components/Table';
import { parseDate, getYear, formatAsISO, formatISO } from 'utils/dates';
import {
  wrongBalanceFile,
  createNeBalanceFail as alertProps,
  createNeBalanceSuccess,
} from 'utils/messages';
import { formatCurrency, parseNumber } from 'utils/numbers';
import {
  splitDocumento,
  parseNumeroContratoRepasse,
  parseConvenio,
} from 'utils/string';
import { FileName, UploadFile, RemoveFile, FindFile } from './styles';

const initialValues = {
  fileDate: new Date(),
};

const validationSchema = Yup.object().shape({
  fileDate: Yup.date()
    .max(new Date(), 'Não pode ser uma data no futuro')
    .required('Obrigatório'),
});

const Create = () => {
  const initialState = { data: null, headers: null, isSending: false };
  const dispatch = useContext(Context)[1];
  const { id: matricula } = useCurrentUser();
  const buttonRef = useRef();
  const dataRef = useRef();
  const [state, setState] = useState(initialState);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const { isSending } = state;
  const history = useHistory();

  const formatBalance = data => {
    const pcaspConta = parseInt(data.pcaspConta, 10);
    const ugCodigo = parseInt(data.ugCodigo, 10);
    const convenio = parseConvenio(data.convenio);
    const convenioComplemento = parseConvenio(data.convenioComplemento);
    const operacao = parseNumeroContratoRepasse(data.convenio);
    const tipoResultadoPrimarioId = parseInt(data.tipoResultadoPrimarioId, 10);
    const anoOrcamentario = getYear(parseDate(data.dataEmissao));
    const saldoContaContabil = parseNumber(data.saldoContaContabil);
    const dataEmissao = formatAsISO(parseDate(data.dataEmissao));
    const documento = splitDocumento(data.documento).join('');
    const { ptres, tipoResultadoPrimarioDescricao } = data;

    return {
      pcaspConta,
      ugCodigo,
      convenio,
      convenioComplemento,
      operacao,
      ptres,
      tipoResultadoPrimarioId,
      tipoResultadoPrimarioDescricao,
      anoOrcamentario,
      documento,
      dataEmissao,
      saldoContaContabil,
    };
  };

  const transformHeader = header => {
    switch (header) {
      case 'UG Executora':
        return 'ugCodigo';
      case 'PTRES':
        return 'ptres';
      case 'Resultado EOF':
        return 'tipoResultadoPrimarioId';
      case '':
        return 'tipoResultadoPrimarioDescricao';
      case 'NE CCor - Dia Emissão':
        return 'dataEmissao';
      case 'NE CCor':
        return 'documento';
      case 'NE CCor - Núm. Original TV':
        return 'convenio';
      case 'Conta Contábil':
        return 'pcaspConta';
      case 'NE CCor - Informação Complementar':
        return 'convenioComplemento';
      case 'Saldo - R$ (Conta Contábil)':
        return 'saldoContaContabil';
      default:
        return 'unknowField';
    }
  };

  const columns = [
    {
      name: 'Código da UG',
      selector: 'ugCodigo',
      sortable: true,
    },
    { name: 'PTRES', selector: 'ptres', sortable: true },
    {
      name: 'Resultado primário',
      selector: 'tipoResultadoPrimarioDescricao',
      sortable: true,
    },
    { name: 'Documento', selector: 'documento', sortable: true },
    {
      name: 'Data emissão',
      selector: 'dataEmissao',
      sortable: true,
      format: row => formatISO(row.dataEmissao),
    },
    { name: 'Convênio', selector: 'convenio', sortable: true },
    {
      name: 'Convênio complemento',
      selector: 'convenioComplemento',
      sortable: true,
    },
    { name: 'Conta', selector: 'pcaspConta', sortable: true },
    {
      name: 'Saldo',
      selector: 'saldoContaContabil',
      sortable: true,
      format: row => formatCurrency(row.saldoContaContabil),
    },
  ];

  const getPayload = () => {
    const uuid = uuidv4();
    const dataReferencia = formatAsISO(dataRef.current.props.selected);
    const saldos = state.data;
    return {
      uuid,
      matricula,
      dataReferencia,
      saldos,
    };
  };

  const handleSuccess = () => {
    dispatch({
      type: 'SET_ALERT',
      payload: { visible: true, ...createNeBalanceSuccess },
    });
    history.goBack();
  };

  const sendRequest = useCallback(
    async values => {
      if (isSending) return;
      setState(prev => ({ ...prev, isSending: true }));
      await apiRap.then(api => {
        doAllXhrRequest({
          alertProps,
          requests: [api.requests.postSaldoNe(values)],
          success: handleSuccess,
        });
      });
      setState(prev => ({ ...prev, isSending: false }));
    },
    [isSending],
  );

  const onSubmit = () => {
    const payload = getPayload();
    sendRequest({ payload });
  };

  const Formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleOpenDialog = e => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = data => {
    try {
      const headers = first(data).meta.fields;
      const d = data.map(item => formatBalance(item.data));
      setState({ headers, data: d });
    } catch (error) {
      dispatch({
        type: 'SET_ALERT',
        payload: { visible: true, ...wrongBalanceFile },
      });
      setState(initialState);
    }
  };

  const handleOnRemoveFile = data => {
    setState({ data });
  };

  const handleRemoveFile = e => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>Atualizar saldo das notas de empenho</PageTitle>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>Enviar arquivo de saldo</CardHeader>
          <CardBody>
            <form onSubmit={Formik.handleSubmit}>
              <FormRow>
                <Field
                  formik={Formik}
                  label="Data do arquivo"
                  name="fileDate"
                  width="192px"
                >
                  <DatePicker
                    ref={dataRef}
                    selected={Formik.values.fileDate}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    onBlur={Formik.handleBlur}
                    value={Formik.values.fileDate}
                    onChange={date => Formik.setFieldValue('fileDate', date)}
                    customInput={
                      <Input id="fileDate" name="fileDate" type="text" />
                    }
                  />
                </Field>
                <FormGroup>
                  <Label>Arquivo.</Label>
                  <CSVReader
                    accept={['text/csv', '.csv', 'text/txt', '.txt']}
                    ref={buttonRef}
                    onFileLoad={handleOnFileLoad}
                    noClick
                    noDrag
                    config={{
                      header: true,
                      transformHeader,
                      skipEmptyLines: 'greedy',
                    }}
                    style={{}}
                    onRemoveFile={handleOnRemoveFile}
                  >
                    {({ file }) => (
                      <UploadFile>
                        <FindFile type="button" onClick={handleOpenDialog}>
                          <FontAwesomeIcon icon={faFolderOpen} />
                        </FindFile>
                        <FileName onClick={handleOpenDialog}>
                          {file ? file.name : 'Selecione um arquivo'}
                        </FileName>
                        <RemoveFile
                          type="button"
                          onClick={handleRemoveFile}
                          disabled={isNull(state.data)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </RemoveFile>
                      </UploadFile>
                    )}
                  </CSVReader>
                </FormGroup>
              </FormRow>
              <FormRow>
                <SmallButtonPrimary type="submit" disabled={isNull(state.data)}>
                  <FontAwesomeIcon icon={faSave} /> Salvar
                </SmallButtonPrimary>
              </FormRow>
            </form>
          </CardBody>
        </Card>
      </Row>
      {state.data && (
        <Row>
          <Card>
            <CardHeader>Pré-visualização dos dados</CardHeader>
            <CardBody>
              <DataTable
                data={state.data.slice(0, 50)}
                columns={columns}
                noHeader
              />
            </CardBody>
          </Card>
        </Row>
      )}
    </Layout>
  );
};

export default Create;
