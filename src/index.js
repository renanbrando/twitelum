import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import Routes from './routes'
import { NotificationContextProvider } from './contexts/NotificationContext'
import * as serviceWorker from './serviceWorker'
//import './store'
import store from "./store/index"
import { Provider } from "react-redux"
// CSSs Globais
import "./assets/scss/reset.scss"
import "./assets/scss/container.scss"
import "./assets/scss/btn.scss"
import "./assets/scss/icon.scss"
import "./assets/scss/iconHeart.scss"
import "./assets/scss/notification.scss"
import "./assets/scss/newTweet.scss"

ReactDOM.render(
  <Provider store={store}>
    <NotificationContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </NotificationContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
