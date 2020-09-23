import React, { useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import {
  Avatar,
  Collapsable,
  CollapsableLink,
  Container,
  Icon,
  Link,
  Name,
} from './styles';
import avatarImg from '~/assets/undraw_male_avatar_323b.svg';
import { logout } from '~/utils/login';
import { useHistory } from 'react-router-dom';
import { homePath } from '~/utils/paths';

const Profile = ({ user }) => {
  const { name, avatar } = user;
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleLogout = event => {
    event.preventDefault();
    logout();
    history.push(homePath);
  };

  const handleClick = event => {
    event.preventDefault();
    setExpanded(prev => !prev);
  };

  return (
    <Container>
      <Link onClick={handleClick}>
        <Name>{name}</Name>
        <Avatar src={avatar ? avatar : avatarImg}></Avatar>
      </Link>
      <Collapsable expanded={expanded}>
        <CollapsableLink onClick={handleLogout}>
          <Icon icon={faSignInAlt} />
          Sair
        </CollapsableLink>
      </Collapsable>
    </Container>
  );
};

export default Profile;
