import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { loginPath } from 'utils/paths';
import { useCurrentUser } from 'hooks';
import Can from 'components/Can';
import AccessForbidden from './AccessForbidden';

const PrivateRoute = ({
  component: Component,
  componentProps,
  perform,
  ...rest
}) => {
  const currentUser = useCurrentUser();
  return (
    <Can
      perform={perform}
      yes={() => (
        <Route
          {...rest}
          render={() =>
            currentUser ? (
              <Component {...componentProps} />
            ) : (
              <Redirect to={loginPath} />
            )
          }
        />
      )}
      no={AccessForbidden}
    />
  );
};

export default PrivateRoute;
