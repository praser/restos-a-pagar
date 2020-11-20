import React from 'react';
import { Container, Progress } from './styles';

const Progressbar = ({ width, variant }) => {
  return (
    <Container>
      <Progress width={width} variant={variant} />
    </Container>
  );
};

export default Progressbar;
