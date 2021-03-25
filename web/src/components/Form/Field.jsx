import React from 'react';
import { ErrorMessage, FormGroup, Input, Label } from 'components/atoms/Form';

const Field = ({ formik, label, name, type, width, children, ...rest }) => {
  const input = (
    <Input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      {...rest}
    />
  );

  return (
    <FormGroup width={width}>
      <Label htmlFor={name}>{label}</Label>
      {children || input}
      {formik.touched[name] && formik.errors[name] ? (
        <ErrorMessage>{formik.errors[name]}</ErrorMessage>
      ) : null}
    </FormGroup>
  );
};
export default Field;
