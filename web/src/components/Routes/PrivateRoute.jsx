import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../../utils/login';
import { routes } from '../../utils/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to={routes.login} />
      }
    />
  );
};

export default PrivateRoute;
