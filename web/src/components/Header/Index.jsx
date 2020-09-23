import React from 'react';

import { Container, Divider, Navbar, Title } from './styles';
import Profile from '../Profile';

const user = {
  name: 'Rubens',
};

const Header = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Navbar>
        <Divider />
        <Profile user={user}></Profile>
      </Navbar>
    </Container>
  );
};

export default Header;
