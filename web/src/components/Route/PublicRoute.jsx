import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { dashboardPath } from 'utils/paths';
import { useCurrentUser } from 'hooks';

const PublicRoute = ({
  component: Component,
  componentProps,
  restricted,
  ...rest
}) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={() =>
        currentUser && restricted ? (
          <Redirect to={dashboardPath} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
};

export default PublicRoute;
