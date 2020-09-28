import React from 'react';
import Header from '~/components/Header/Index';
import { Content, Main } from './styles';

const Layout = ({ children }) => {
  return (
    <Content>
      <Header title={process.env.REACT_APP_WEBSITE_NAME} />
      <Main>{children}</Main>
    </Content>
  );
};

export default Layout;
