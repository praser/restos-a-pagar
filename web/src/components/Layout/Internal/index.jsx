import React from 'react';
import Navigation from '~/components/Navigation';

import { Container } from '../styles';
import { Content } from './styles';

const Layout = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
