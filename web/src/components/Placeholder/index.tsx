import React, { FunctionComponent } from 'react';

import IProps from './IProps';
import { Container, Image } from './styles';

const Placeholder: FunctionComponent<IProps> = ({ src, children }) => {
  return (
    <>
      {children}
      <Container>
        <Image src={src} />
      </Container>
    </>
  );
};

export default Placeholder;
