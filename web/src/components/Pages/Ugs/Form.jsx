import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { ErrorMesssage, FormGroup, FormRow, Input, Label } from '../../Form';
import { SmallButtonPrimary, SmallButtonWarning } from '../../Button';

const validationSchema = Yup.object().shape({
  code: Yup.number()
    .integer('Deve ser um número inteiro')
    .required('Obrigatório'),
  name: Yup.string()
    .max(255, 'Deve possuir no máximo 255 caractéres')
    .required('Obrigatório'),
  managerAbbreviation: Yup.string()
    .max(10, 'Deve possuir no máximo 10 caratéres')
    .required('Obrigatório'),
  managerName: Yup.string()
    .max(255, 'Deve possuir no máximo 255 caratéres')
    .required('Obrigatório'),
});

const Form = ({ initialValues, onSubmit }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow>
        <FormGroup width="20%">
          <Label htmlFor="code">Código da UG</Label>
          <Input
            id="code"
            name="code"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <ErrorMesssage>{formik.errors.code}</ErrorMesssage>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Nome da UG</Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorMesssage>{formik.errors.name}</ErrorMesssage>
          ) : null}
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup width="30%">
          <Label htmlFor="managerAbbreviation">Sigla do Gestor</Label>
          <Input
            id="managerAbbreviation"
            name="managerAbbreviation"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.managerAbbreviation}
          />
          {formik.touched.managerAbbreviation &&
          formik.errors.managerAbbreviation ? (
            <ErrorMesssage>{formik.errors.managerAbbreviation}</ErrorMesssage>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="managerName">Nome do Gestor</Label>
          <Input
            id="managerName"
            name="managerName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.managerName}
          />
          {formik.touched.managerName && formik.errors.managerName ? (
            <ErrorMesssage>{formik.errors.managerName}</ErrorMesssage>
          ) : null}
        </FormGroup>
      </FormRow>
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
