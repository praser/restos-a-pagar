import React from 'react';
import Layout from './Layout';
import { ButtonPrimary } from '../Button';

const Alert = ({ title, text, onConfirm, visible }) => {
  const confirmBtn = (
    <ButtonPrimary onClick={onConfirm} key={0}>
      Ok
    </ButtonPrimary>
  );

  return (
    <Layout
      visible={visible}
      title={title}
      text={text}
      buttons={[confirmBtn]}
    />
  );
};

export default Alert;
