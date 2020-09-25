import React, { useState, useEffect } from 'react';
import { isArray } from 'lodash';

import { Body, Container, Footer, Header, Modal } from './styles';

const Layout = ({ title, text, buttons, visible: _visible }) => {
  const [visible, setVisible] = useState(_visible);

  useEffect(() => {
    setVisible(_visible);
  }, [_visible]);

  return (
    <Modal visible={visible}>
      <Container>
        <Header>{title}</Header>
        <Body>{text}</Body>
        {isArray(buttons) && <Footer>{buttons.map(Button => Button)}</Footer>}
      </Container>
    </Modal>
  );
};

export default Layout;
