import React, { useContext, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  faFolderOpen,
  faSave,
  faTable,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SmallButtonPrimary, SmallButtonWarning } from '../../Button';
import { Card, CardBody, CardHeader } from '../../Card';
import { Field, FormGroup, FormRow, Input, Label } from '../../Form';
import { Heading } from '../../Layout';
import Layout from '../../Layout/Internal';
import { PageTitle } from '../../Tipography';
import { CSVReader } from 'react-papaparse';
import { parseDate, getYear, formatAsISO } from '~/utils/dates';
import { parseNumber } from '~/utils/numbers';
import {
  splitDocumento,
  parseNumeroContratoRepasse,
  parseConvenio,
} from '~/utils/string';
import { v4 as uuidv4 } from 'uuid';
import { useCurrentUser } from '~/hooks';
import { isNull, first } from 'lodash';
import { FileName, UploadFile, RemoveFile, FindFile } from './styles';
import { Context } from '../../Store';
import { wrongBalanceFile } from '~/utils/messages';

const initialValues = {
  fileDate: new Date(),
  filePath: '',
};

const validationSchema = Yup.object().shape({
  fileDate: Yup.date()
    .max(new Date(), 'Não pode ser uma data no futuro')
    .required('Obrigatório'),
  filePath: Yup.string().required('Obrigatório'),
});

const onSubmit = values => {
  return JSON.stringify(values);
};

const Create = () => {
  const Formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const initialState = { data: null, headers: null };
  const dispatch = useContext(Context)[1];
  const { id: matricula } = useCurrentUser();
  const buttonRef = useRef();
  const dataRef = useRef();
  const [state, setState] = useState(initialState);

  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
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

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('handleOnError:', err, file, inputElem, reason);
  };

  const handleOnRemoveFile = data => {
    setState({ data });
  };

  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  const formatBalance = data => {
    const pcaspConta = parseInt(data.pcaspConta);
    const ugCodigo = parseInt(data.ugCodigo);
    const convenio = parseConvenio(data.convenio);
    const operacao = parseNumeroContratoRepasse(data.convenio);
    const tipoResultadoPrimarioId = parseInt(data.tipoResultadoPrimarioId);
    const anoOrcamentario = getYear(parseDate(data.dataEmissao));
    const saldoContaContabil = parseNumber(data.saldoContaContabil);
    const dataEmissao = formatAsISO(parseDate(data.dataEmissao));
    const documento = splitDocumento(data.documento).join('');

    return {
      ...data,
      pcaspConta,
      ugCodigo,
      convenio,
      operacao,
      anoOrcamentario,
      documento,
      dataEmissao,
      saldoContaContabil,
      tipoResultadoPrimarioId,
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
      case 'Dia Emissão NE CCor':
        return 'dataEmissao';
      case 'Nota Empenho CCor':
        return 'documento';
      case 'Núm. Original TV NE CCor':
        return 'convenio';
      case 'Conta Contábil':
        return 'pcaspConta';
      case 'Saldo - R$ (Conta Contábil)':
        return 'saldoContaContabil';
        defaut: return 'unknowField';
    }
  };

  return (
    <Layout>
      <Heading>
        <PageTitle>Atualiza saldo das notas de empenho</PageTitle>
      </Heading>
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
              {/* <Field
                formik={Formik}
                label="Arquivo"
                name="filePath"
                type="file"
                accept=".csv, .txt"
              /> */}
              <FormGroup>
                <Label>Arquivo.</Label>
                <CSVReader
                  accept={['text/csv', '.csv', 'text/txt', '.txt']}
                  ref={buttonRef}
                  onFileLoad={handleOnFileLoad}
                  onFileError={handleOnError}
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
              <SmallButtonPrimary disabled={isNull(state.data)}>
                <FontAwesomeIcon icon={faSave} /> Salvar
              </SmallButtonPrimary>
              <SmallButtonWarning
                type="button"
                disabled={isNull(state.data)}
                onClick={() => console.log(state.data.slice(0, 50))}
              >
                <FontAwesomeIcon icon={faTable} /> Visualizar as primeiras 50
                linhas
              </SmallButtonWarning>
            </FormRow>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Create;
