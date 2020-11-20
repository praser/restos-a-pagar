import React from 'react';
import { Body, Container, DismissButton, Header, Modal } from './styles';

const RightTab = ({ visible, title, children, onClose }) => {
  return (
    <Modal visible={visible}>
      <Container alignLeft>
        <Header>
          {title}
          <DismissButton onClick={onClose}>x</DismissButton>
        </Header>
        <Body>{children}</Body>
      </Container>
    </Modal>
  );
};

export default RightTab;
