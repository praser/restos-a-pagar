import React from 'react';

import { Body, Container, Footer, Header, Modal } from './styles';

const Layout = ({ title, text, buttons, visible }) => {
  return (
    <Modal visible={visible}>
      <Container>
        <Header>{title}</Header>
        <Body>{text}</Body>
        <Footer>{buttons.map(Button => Button)}</Footer>
      </Container>
    </Modal>
  );
};

export default Layout;
