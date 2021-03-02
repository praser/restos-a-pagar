import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { dashboardPath } from 'utils/paths';
import { useCurrentUser } from 'hooks';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        currentUser && restricted ? (
          <Redirect to={dashboardPath} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
