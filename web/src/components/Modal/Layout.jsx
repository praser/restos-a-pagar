import React, { useState, useEffect } from 'react';
import { isArray } from 'lodash';

import {
  Body,
  Container,
  DismissButton,
  Footer,
  Header,
  Modal,
} from './styles';

const Layout = ({
  title,
  content,
  buttons,
  visible: _visible,
  children,
  width,
  dismissible,
  onClose,
}) => {
  const [visible, setVisible] = useState(_visible);

  useEffect(() => {
    setVisible(_visible);
  }, [_visible]);

  return (
    <Modal visible={visible}>
      <Container width={width}>
        <Header>
          {title}
          {dismissible && <DismissButton onClick={onClose}>x</DismissButton>}
        </Header>
        <Body>
          {content}
          {children}
        </Body>
        {isArray(buttons) && <Footer>{buttons.map(Button => Button)}</Footer>}
      </Container>
    </Modal>
  );
};

export default Layout;
