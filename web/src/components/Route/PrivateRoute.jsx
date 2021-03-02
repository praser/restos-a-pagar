import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { loginPath } from 'utils/paths';
import { useCurrentUser } from 'hooks';
import Can from '../Can';
import Error from 'pages/Error';

const accessForbiden = () => (
  <Error
    code={401}
    description="Você não pode acessar essa página"
    paragraph="Há uma diferença entre conhecer o caminho e percorrer o caminho."
  />
);

const PrivateRoute = ({ component: Component, perform, ...rest }) => {
  const currentUser = useCurrentUser();
  return (
    <Can
      perform={perform}
      yes={() => (
        <Route
          {...rest}
          render={props =>
            currentUser ? <Component {...props} /> : <Redirect to={loginPath} />
          }
        />
      )}
      no={accessForbiden}
    />
  );
};

export default PrivateRoute;
