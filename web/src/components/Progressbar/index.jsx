import React from 'react';
import { Container, Progress } from './styles';

const Progressbar = ({ width }) => {
  return (
    <Container>
      <Progress width={width} />
    </Container>
  );
};

export default Progressbar;
