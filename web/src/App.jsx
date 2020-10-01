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

const initialState = {
  jwt: '',
  loading: false,
  alert: {
    visible: false,
    title: '',
    text: '',
  },
};

const App = () => {
  const [state, setState] = useState(initialState);
  const currentUser = useCurrentUser();

  const setLoading = loading => {
    setState(prev => ({ ...prev, loading }));
  };

  const setAlert = alert => {
    setState(prev => ({ ...prev, alert: alert() }));
  };

  const handleAlertConfirm = event => {
    event.preventDefault();
    setState(prev => ({ ...prev, alert: { visible: false } }));
  };

  return (
    <React.StrictMode>
      <Reset />
      <Loading visible={state.loading} title="Carregando..." />
      <Alert
        visible={state.alert.visible}
        title={state.alert.title}
        text={state.alert.text}
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
