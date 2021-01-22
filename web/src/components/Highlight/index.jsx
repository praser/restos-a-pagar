import React from 'react';
import { Body, Container, Content, Icon, Title } from './styles';

const Highlight = ({ children, icon, title, variant, ...rest }) => {
  return (
    <Container variant={variant} {...rest}>
      <Body>
        <Content>
          <Title className="highlight-title" variant={variant}>
            {title}
          </Title>
          {children}
        </Content>
        <Icon icon={icon} />
      </Body>
    </Container>
  );
};

export default Highlight;
