import React from 'react';

import image from 'assets/undraw_No_data_re_kwbl.svg';
import { Paragraph } from '../Tipography';
import { NoDataImage } from './styles';

const NoData = ({ text }) => {
  return (
    <>
      <NoDataImage src={image} />
      <Paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
        {text ||
          'Foi uma boa tantentiva, pena que ainda não tenho nenhum dado para mostrar nesta tabela...'}
      </Paragraph>
    </>
  );
};

export default NoData;
