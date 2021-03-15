import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Reset } from 'styled-reset';
import { defaults } from 'react-chartjs-2';
import ptBR from 'date-fns/locale/pt-BR';
import Login from 'components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isNull } from 'lodash';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

import { Alert, Loading } from 'components/Modal';
import {
  Cancellations,
  Error,
  JudicialInjunctionCreate,
  JudicialInjunctionList,
  Locks,
  PossibleLocks,
  UgCreate,
  UgList,
  UgUpdate,
  UnlockCreate,
  UnlockList,
  UpdateCommitment,
} from 'pages';

import { PrivateRoute, PublicRoute } from 'components/Route';
import Dashboard from 'components/Dashboard';
import Placeholder from 'components/Placeholder';
import Navigation from 'components/Navigation';
import { Container } from 'components/Layout';
import { Context } from 'components/Store';
import { useApiRap, useCurrentUser } from 'hooks';
import * as paths from 'utils/paths';
import { getToken } from 'utils/jwt';

import placeholderImage from 'assets/undraw_Metrics_re_6g90.svg';

import 'react-datepicker/dist/react-datepicker.css';
import { mostRecentParams } from 'utils/arrays';

registerLocale('pt-BR', ptBR);
setDefaultLocale('pt-BR');

defaults.global.defaultFontFamily =
  'Nunito,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
defaults.global.defaultFontColor = '#858796';

const App = () => {
  const [context, dispatch] = useContext(Context);
  const currentUser = useCurrentUser();
  const apiRap = useApiRap();
  const [params, setParams] = useState();

  useEffect(() => {
    dispatch({ type: 'SET_JWT', payload: getToken() });
  }, []);

  const fetchParams = useCallback(async () => {
    const api = await apiRap;
    const res = await api.requests.getParams();
    setParams(res.data);
  }, []);

  useEffect(() => {
    fetchParams();
  }, [fetchParams]);

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

  if (currentUser && params) {
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
                componentProps={mostRecentParams(params)[0]}
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
                component={UnlockList}
                path={paths.unlockPath}
                perform="unlock:list"
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
  }
  return currentUser ? <Placeholder src={placeholderImage} /> : <Login />;
};

export default App;
