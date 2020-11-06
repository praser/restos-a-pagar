import React, { useContext, useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from '~/hooks';
import { Context } from '../Store';

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
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const dispatch = useContext(Context)[1];
  const currentUser = useCurrentUser();
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  let firstName, photo;

  if (currentUser) {
    firstName = currentUser.firstName;
    photo = currentUser.photo;
  }

  const handleLogout = event => {
    event.preventDefault();
    removeToken();
    dispatch({ type: 'SET_JWT', payload: null });
    history.push('/');
  };

  const handleClick = event => {
    event.preventDefault();
    setExpanded(prev => !prev);
  };

  return (
    <Container>
      <Button onClick={handleClick}>
        <Name>{firstName}</Name>
        <Avatar src={photo || avatarImg} />
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
