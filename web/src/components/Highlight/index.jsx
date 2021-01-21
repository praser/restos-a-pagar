import React from 'react';
import { Body, Container, Content, Icon, Title } from './styles';

const Highlight = ({ children, icon, title, variant }) => {
  return (
    <Container variant={variant}>
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
