import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useCurrentUser } from '~/hooks';
import { loginPath } from '~/utils/paths';

const PrivateRoute = ({
  component: Component,
  setAlert,
  setLoading,
  ...rest
}) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} setAlert={setAlert} setLoading={setLoading} />
        ) : (
          <Redirect to={loginPath} />
        )
      }
    />
  );
};

export default PrivateRoute;
