import React, { useContext, useEffect } from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isNull } from 'lodash';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { defaults } from 'react-chartjs-2';
import ptBR from 'date-fns/locale/pt-BR';

import { Alert, Loading } from '~/components/Modal';
import {
  Cancellations,
  Error,
  JudicialInjunctionCreate,
  JudicialInjunctionList,
  Locks,
  Login,
  PossibleLocks,
  UgCreate,
  UgList,
  UgUpdate,
  UnlockCreate,
  UpdateCommitment,
} from '../Pages';

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

defaults.global.defaultFontFamily =
  'Nunito,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
defaults.global.defaultFontColor = '#858796';

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
        <Router basename={process.env.REACT_APP_ROUTER_BASE}>
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
              perform="dashboards:show"
              exact
            />
            <PrivateRoute
              component={PossibleLocks}
              path={paths.possibleLocksPath}
              perform="dashboards:show"
              exact
            />
            <PrivateRoute
              component={UgList}
              path={paths.ugPath}
              perform="ugs:list"
              exact
            />
            <PrivateRoute
              component={UgCreate}
              path={paths.createUgPath}
              perform="ugs:create"
              exact
            />
            <PrivateRoute
              component={UgUpdate}
              path={paths.updateUgPath}
              perform="ugs:update"
              exact
            />
            <PrivateRoute
              component={UpdateCommitment}
              path={paths.updateCommitmentPath}
              perform="commitment:create"
              exact
            />
            <PrivateRoute
              component={Locks}
              path={paths.locksPath}
              perform="dashboards:show"
              exact
            />
            <PrivateRoute
              component={Cancellations}
              path={paths.cancellationsPath}
              perform="dashboards:show"
              exact
            />
            <PrivateRoute
              component={UnlockCreate}
              path={paths.createUnlockPath}
              perform="unlock:create"
              exact
            />
            <PrivateRoute
              component={JudicialInjunctionCreate}
              path={paths.createJudicialInjunction}
              perform="judicialInjunction:create"
              exact
            />
            <PrivateRoute
              component={JudicialInjunctionList}
              path={paths.listJudicialInjunction}
              perform="judicialInjunction:list"
              exact
            />
            <Route
              render={() => (
                <Error
                  code="404"
                  description="Página não encontrada"
                  paragraph="Parece que você encontrou um buraco na Matrix..."
                />
              )}
            />
          </Switch>
        </Router>
      </Container>
    </React.StrictMode>
  );
};

export default App;
