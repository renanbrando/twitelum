import React from 'react';
import ReactDOM from 'react-dom';
// CSSs Globais
import "./assets/scss/reset.scss";
import "./assets/scss/container.scss";
import "./assets/scss/btn.scss";
import "./assets/scss/icon.scss";
import "./assets/scss/iconHeart.scss";
import "./assets/scss/notification.scss";
import "./assets/scss/newTweet.scss";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
