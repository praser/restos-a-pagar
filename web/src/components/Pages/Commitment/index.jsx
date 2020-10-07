import React from 'react';
import DatePicker from 'react-datepicker';
import { faSave, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SmallButtonPrimary, SmallButtonWarning } from '../../Button';
import { Card, CardBody, CardHeader } from '../../Card';
import { ErrorMesssage, FormGroup, FormRow, Input, Label } from '../../Form';
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
  alert(JSON.stringify(values));
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
              <FormGroup width="192px">
                <Label htmlFor="fileDate">Data do arquivo</Label>
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
                {Formik.touched.fileDate && Formik.errors.fileDate ? (
                  <ErrorMesssage>{Formik.errors.fileDate}</ErrorMesssage>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="filePath">Arquivo</Label>
                <Input
                  accept=".csv, .txt"
                  id="filePath"
                  name="filePath"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.filePath}
                  type="file"
                />
                {Formik.touched.filePath && Formik.errors.filePath ? (
                  <ErrorMesssage>{Formik.errors.filePath}</ErrorMesssage>
                ) : null}
              </FormGroup>
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
