import React from 'react';
import Header from '~/components/Header/Index';
import Navigation from '~/components/Navigation';

import { Container } from '..';
import { Content, Main } from './styles';

const Layout = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Content>
        <Header title={process.env.REACT_APP_WEBSITE_NAME} />
        <Main>{children}</Main>
      </Content>
    </Container>
  );
};

export default Layout;
