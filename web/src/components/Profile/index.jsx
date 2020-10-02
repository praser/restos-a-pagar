import React, { useContext, useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from '~/hooks';
import { Context } from '~/Store';

import {
  Avatar,
  Button,
  Collapsable,
  CollapsableLink,
  Container,
  Icon,
  Name,
} from './styles';
import avatarImg from '~/assets/undraw_male_avatar_323b.svg';
import { removeToken } from '~/utils/jwt';

const Profile = () => {
  const dispatch = useContext(Context)[1];
  const { firstName, avatar } = useCurrentUser();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = event => {
    event.preventDefault();
    removeToken();
    dispatch({ type: 'SET_JWT', payload: null });
  };

  const handleClick = event => {
    event.preventDefault();
    setExpanded(prev => !prev);
  };

  return (
    <Container>
      <Button onClick={handleClick}>
        <Name>{firstName}</Name>
        <Avatar src={avatar || avatarImg} />
      </Button>
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
