import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faLongArrowAltLeft,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ErrorMesssage, Field, FormRow, Input } from '../../Form';
import { SmallButtonPrimary, SmallButtonWarning } from '../../Button';
import {
  FileName,
  FindFile,
  RemoveFile,
  UploadFile,
} from '../Commitment/styles';
import Table from '~/components/Table';
import { operacoesColumns as columns } from '../Dashboards/utils';
import { useApiRap, useXHR } from '~/hooks';
import { loadOperacoes } from '~/utils/messages';
import { Row } from '~/components/Layout';

const validationSchema = Yup.object().shape({
  code: Yup.number()
    .integer('Deve ser um número inteiro')
    .required('Obrigatório'),
  name: Yup.string()
    .max(255, 'Deve possuir no máximo 255 caractéres')
    .required('Obrigatório'),
  issuanceDate: Yup.date()
    .max(new Date(), 'Não pode ser uma data no futuro')
    .required('Obrigatório'),
  injunctionDigitalization: Yup.string().required('Obrigatório'),
  siarg: Yup.number()
    .integer('Deve ser um número inteiro')
    .required('Obrigatório'),
  notes: Yup.string().max(4000, 'Deve possuir no máximo 4000 caractéres'),
  contracts: Yup.array().min(
    1,
    'É necessário selecionar pelo menos uma operação',
  ),
});

const Form = ({ initialValues, onSubmit }) => {
  const history = useHistory();
  const issuanceDateRef = useRef();
  const fileNameRef = useRef();
  const [operacoes, setOperacoes] = useState([]);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const { data } = res[0];
        setOperacoes(data);
      };

      const requests = [api.requests.getOperacoes()];

      doAllXhrRequest({
        alertProps: loadOperacoes,
        requests,
        success,
      });
    });
  }, []);

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="nope">
      <FormRow>
        <Field
          formik={formik}
          label="Número do processo"
          name="code"
          type="number"
          width="20%"
        />
        <Field formik={formik} label="Requerente" name="name" />
        <Field
          formik={formik}
          label="Data da decisão"
          name="issuanceDate"
          width="192px"
        >
          <DatePicker
            ref={issuanceDateRef}
            selected={formik.values.issuanceDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            onBlur={formik.handleBlur}
            value={formik.values.issuanceDate}
            onChange={date => formik.setFieldValue('issuanceDate', date)}
            customInput={
              <Input id="issuanceDate" name="issuanceDate" type="text" />
            }
          />
        </Field>
      </FormRow>

      <FormRow>
        <Field
          formik={formik}
          label="Digitalização da liminar"
          name="injunctionDigitalization"
        >
          <UploadFile
            onClick={e => {
              const fileInput = e.currentTarget.querySelector(
                'input[type=file]',
              );
              fileInput.click();
            }}
          >
            <FindFile type="button">
              <FontAwesomeIcon icon={faFolderOpen} />
            </FindFile>
            <FileName ref={fileNameRef}>Selecione um arquivo</FileName>
            <RemoveFile type="button" disabled={true}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </RemoveFile>
            <input
              style={{ display: 'none' }}
              type="file"
              accept="pdf,png,bmp"
              onChange={e => {
                const file = e.currentTarget.value;
                fileNameRef.current.innerHTML = file;
                formik.setFieldValue('injunctionDigitalization', file);
              }}
            />
          </UploadFile>
        </Field>
        <Field
          formik={formik}
          label="Número SIARG"
          name="siarg"
          width="192px"
          type="number"
        />
      </FormRow>

      <FormRow>
        <Field
          as="textarea"
          formik={formik}
          label="Observações"
          name="notes"
          rows={10}
        />
      </FormRow>

      <FormRow>
        <Table
          title="Selecione as operações alcançadas pela liminar judicial"
          data={operacoes}
          columns={columns}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: 'Resultados por página:',
            rangeSeparatorText: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: 'Todos',
          }}
          striped
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          noDataComponent="Ainda não tenho nada para mostrar aqui..."
          contextMessage={{
            singular: 'operação',
            plural: 'operações',
            message: 'alcançada(s) pela liminar judicial',
          }}
          onSelectedRowsChange={state => {
            const field = 'contracts';
            formik.setFieldTouched(field, true);
            formik.setFieldValue(
              field,
              state.selectedRows.map(row => row.id),
            );
          }}
          searchable
        />
      </FormRow>
      <Row>
        {formik.touched.contracts && formik.errors.contracts ? (
          <ErrorMesssage>{formik.errors.contracts}</ErrorMesssage>
        ) : null}
      </Row>

      <FormRow>
        <SmallButtonPrimary>
          <FontAwesomeIcon icon={faSave} />
          Salvar
        </SmallButtonPrimary>
        <SmallButtonWarning onClick={handleGoBack}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
          Voltar
        </SmallButtonWarning>
      </FormRow>
    </form>
  );
};

export default Form;
