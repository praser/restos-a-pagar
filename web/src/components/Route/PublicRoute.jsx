import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../../utils/login';
import { dashboardPath } from '../../utils/paths';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() && restricted ? (
          <Redirect to={dashboardPath} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
