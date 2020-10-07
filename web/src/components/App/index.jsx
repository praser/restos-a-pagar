import React, { useContext, useEffect } from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isNull } from 'lodash';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import { Alert, Loading } from '~/components/Modal';
import {
  Cancellations,
  Error,
  Locks,
  Login,
  PossibleLocks,
  UgCreate,
  UgList,
  UgUpdate,
  UpdateCommitment,
} from '../../pages';

import { PrivateRoute, PublicRoute } from '../Route';
import * as paths from '../../utils/paths';
import Dashboard from '../Dashboard';
import Navigation from '../Navigation';
import { Container } from '../Layout';
import { useCurrentUser } from '../../hooks';
import { Context } from '../Store';
import { getToken } from '~/utils/jwt';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

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
            <PrivateRoute component={UgList} path={paths.ugPath} exact />
            <PrivateRoute
              component={UgCreate}
              path={paths.createUgPath}
              exact
            />
            <PrivateRoute
              component={UgUpdate}
              path={paths.updateUgPath}
              exact
            />
            <PrivateRoute
              component={UpdateCommitment}
              path={paths.updateCommitmentPath}
              exact
            />
            <PrivateRoute component={Locks} path={paths.locksPath} exact />
            <PrivateRoute
              component={Cancellations}
              path={paths.cancellationsPath}
              exact
            />
            <Route
              render={() => (
                <Error code="404" description="Página não encontrada" />
              )}
            />
          </Switch>
        </Router>
      </Container>
    </React.StrictMode>
  );
};

export default App;
