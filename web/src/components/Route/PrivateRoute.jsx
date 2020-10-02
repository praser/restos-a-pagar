import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useCurrentUser } from '~/hooks';
import { loginPath } from '~/utils/paths';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? <Component {...props} /> : <Redirect to={loginPath} />
      }
    />
  );
};

export default PrivateRoute;
