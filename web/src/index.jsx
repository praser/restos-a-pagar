import React from 'react';
import ReactDOM from 'react-dom';
import replaceAll from 'string.prototype.replaceall';
import Store from '~/components/Store';
import * as serviceWorker from './serviceWorker';
import App from '~/App';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

replaceAll.shim();

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
