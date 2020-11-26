import React from 'react';
import Layout from './Layout';
import { ButtonPrimary, ButtonSecondary } from '../Button';

const Prompt = ({
  title,
  text,
  onConfirm,
  onCancel,
  visible,
  confirmButtonText,
}) => {
  const cancelBtn = (
    <ButtonSecondary onClick={onCancel} key={1}>
      Cancelar
    </ButtonSecondary>
  );

  const confirmBtn = (
    <ButtonPrimary onClick={onConfirm} key={0}>
      {confirmButtonText || 'Ok'}
    </ButtonPrimary>
  );

  return (
    <Layout
      visible={visible}
      title={title}
      text={text}
      buttons={[cancelBtn, confirmBtn]}
    />
  );
};

export default Prompt;
