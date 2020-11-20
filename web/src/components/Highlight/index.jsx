import React from 'react';
import { Body, Container, Content, Icon, Title } from './styles';

const Highlight = ({ children, icon, siblings, title, variant }) => {
  return (
    <Container variant={variant} siblings={siblings}>
      <Body>
        <Content>
          <Title variant={variant}>{title}</Title>
          {children}
        </Content>
        <Icon icon={icon} />
      </Body>
    </Container>
  );
};

export default Highlight;
