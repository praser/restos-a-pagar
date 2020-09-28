import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '~/utils/login';
import { loginPath } from '~/utils/paths';

const PrivateRoute = ({
  component: Component,
  setAlert,
  setLoading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} setAlert={setAlert} setLoading={setLoading} />
        ) : (
          <Redirect to={loginPath} />
        )
      }
    />
  );
};

export default PrivateRoute;
