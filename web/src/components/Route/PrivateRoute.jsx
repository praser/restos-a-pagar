import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../../utils/login';
import { loginPath } from '../../utils/paths';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to={loginPath} />
      }
    />
  );
};

export default PrivateRoute;
