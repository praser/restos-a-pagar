import React, { useState } from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { isNull } from 'lodash';
import { Alert, Loading } from '~/components/Modal';
import { PossibleLocks, Error, Login } from './pages';

import { PrivateRoute, PublicRoute } from './components/Route';
import * as paths from './utils/paths';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import { Container } from './components/Layout';
import { useCurrentUser } from './hooks';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const currentUser = useCurrentUser();

  const handleAlertConfirm = event => {
    event.preventDefault();
    setAlert(false);
  };

  return (
    <React.StrictMode>
      <Reset />
      <Loading visible={loading} title="Carregando..." />
      <Alert
        visible={alert}
        title="Ops..."
        text="Login e senha inválidos"
        onConfirm={handleAlertConfirm}
      />
      <Container>
        <Router>
          <Navigation visible={!isNull(currentUser)} />
          <Switch>
            <PublicRoute
              restricted
              component={Login}
              path={paths.homePath}
              exact
              setAlert={setAlert}
              setLoading={setLoading}
            />
            <PublicRoute
              restricted
              component={Login}
              path={paths.loginPath}
              exact
              setAlert={setAlert}
              setLoading={setLoading}
            />
            <PrivateRoute
              component={Dashboard}
              path={paths.dashboardPath}
              exact
              setAlert={setAlert}
              setLoading={setLoading}
            />
            <PrivateRoute
              component={PossibleLocks}
              path={paths.possibleLocksPath}
              exact
              setAlert={setAlert}
              setLoading={setLoading}
            />
            <Route
              render={() => (
                <Error code="404" description="Página não encontrada" />
              )}
              path="*"
            />
          </Switch>
        </Router>
      </Container>
    </React.StrictMode>
  );
};

export default App;
