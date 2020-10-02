import React, { useContext, useEffect } from 'react';
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
import { Context } from './Store';
import { getToken } from '~/utils/jwt';

const App = () => {
  const [context, dispatch] = useContext(Context);
  const currentUser = useCurrentUser();

  useEffect(() => {
    dispatch({ type: 'SET_JWT', payload: getToken() });
  }, []);

  const handleAlertConfirm = event => {
    event.preventDefault();
    dispatch({
      type: 'SET_ALERT',
      payload: { alert: { visible: false } },
    });
  };

  const navigation = () => {
    if (isNull(currentUser)) {
      return <></>;
    }

    return <Navigation />;
  };

  const { loading, alert } = context;
  const { visible, title, text } = alert;

  return (
    <React.StrictMode>
      <Reset />
      <Loading visible={loading} title="Carregando..." />
      <Alert
        visible={visible}
        title={title}
        text={text}
        onConfirm={handleAlertConfirm}
      />
      <Container>
        <Router>
          {navigation()}
          <Switch>
            <PublicRoute
              restricted
              component={Login}
              path={paths.homePath}
              exact
            />
            <PublicRoute
              restricted
              component={Login}
              path={paths.loginPath}
              exact
            />
            <PrivateRoute
              component={Dashboard}
              path={paths.dashboardPath}
              exact
            />
            <PrivateRoute
              component={PossibleLocks}
              path={paths.possibleLocksPath}
              exact
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
