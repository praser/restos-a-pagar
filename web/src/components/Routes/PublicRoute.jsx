import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../../utils/login';
import { routes } from '../../utils/routes';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() && restricted ? (
          <Redirect to={routes.dashboard} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
