import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useCurrentUser } from '~/hooks';
import { dashboardPath } from '~/utils/paths';

const PublicRoute = ({
  component: Component,
  restricted,
  setAlert,
  setLoading,
  ...rest
}) => {
  const currentUser = useCurrentUser();
  return (
    <Route
      {...rest}
      render={props =>
        currentUser && restricted ? (
          <Redirect to={dashboardPath} />
        ) : (
          <Component {...props} setAlert={setAlert} setLoading={setLoading} />
        )
      }
    />
  );
};

export default PublicRoute;
