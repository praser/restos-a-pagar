import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Field, FormRow } from '../../components/Form';
import {
  SmallButtonPrimary,
  SmallButtonWarning,
} from '../../components/Button';

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
        <Field
          formik={formik}
          label="Código da UG"
          name="code"
          type="number"
          width="20%"
        />
        <Field formik={formik} label="Nome da UG" name="name" />
      </FormRow>
      <FormRow>
        <Field
          formik={formik}
          label="Sigla do Gestor"
          name="managerAbbreviation"
          width="30%"
        />
        <Field formik={formik} label="Nome do Gestor" name="managerName" />
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
