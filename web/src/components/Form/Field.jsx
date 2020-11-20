import React from 'react';
import { ErrorMesssage, FormGroup, Input, Label } from './styles';

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
        <ErrorMesssage>{formik.errors[name]}</ErrorMesssage>
      ) : null}
    </FormGroup>
  );
};
export default Field;
