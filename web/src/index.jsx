import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import * as serviceWorker from './serviceWorker';

import { Login } from './components/login';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Nunito');

  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyles />
    <Login />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
