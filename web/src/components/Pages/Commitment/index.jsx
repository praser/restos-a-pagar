import React from 'react';
import DatePicker from 'react-datepicker';
import { faSave, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SmallButtonPrimary, SmallButtonWarning } from '../../Button';
import { Card, CardBody, CardHeader } from '../../Card';
import { Field, FormRow, Input } from '../../Form';
import { Heading } from '../../Layout';
import Layout from '../../Layout/Internal';
import { PageTitle } from '../../Tipography';

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
              <Field
                formik={Formik}
                label="Arquivo"
                name="filePath"
                type="file"
                accept=".csv, .txt"
              />
            </FormRow>
            <FormRow>
              <SmallButtonPrimary>
                <FontAwesomeIcon icon={faSave} /> Salvar
              </SmallButtonPrimary>
              <SmallButtonWarning type="button">
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
