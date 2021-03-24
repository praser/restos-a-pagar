import React from 'react';
import Button from 'components/atoms/Button';
import Layout from './Layout';

const Prompt = ({
  title,
  text,
  onConfirm,
  onCancel,
  visible,
  confirmButtonText,
}) => {
  const cancelBtn = (
    <Button secondary onClick={onCancel} key={1}>
      Cancelar
    </Button>
  );

  const confirmBtn = (
    <Button onClick={onConfirm} key={0}>
      {confirmButtonText || 'Ok'}
    </Button>
  );

  return (
    <Layout
      visible={visible}
      title={title}
      content={text}
      buttons={[cancelBtn, confirmBtn]}
      width="500px"
    />
  );
};

export default Prompt;
