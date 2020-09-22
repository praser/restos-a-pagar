import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Login } from './components/Login';
import { PrivateRoute, PublicRoute } from './components/Route';
import * as paths from './utils/paths';

const Dashboard = () => <h1>Dashboard</h1>;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Router>
      <Switch>
        <PublicRoute restricted component={Login} path={paths.homePath} exact />
        <PublicRoute
          restricted
          component={Login}
          path={paths.loginPath}
          exact
        />
        <PrivateRoute component={Dashboard} path={paths.dashboardPath} exact />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
