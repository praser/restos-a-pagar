import React from 'react';

import Button from 'components/atoms/Button';

import Layout from './Layout';

const Alert = ({ title, text, onConfirm, visible }) => {
  const confirmBtn = (
    <Button onClick={onConfirm} key={0}>
      Ok
    </Button>
  );

  return (
    <Layout
      visible={visible}
      title={title}
      content={text}
      buttons={[confirmBtn]}
      width="500px"
    />
  );
};

export default Alert;
