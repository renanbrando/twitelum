import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/NotFound'

class PrivateRoute extends Component {
  isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false
  }

  render () {
    const { component: Component, ...props } = this.props

    return this.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
  }
}

class App extends Component {

  render () {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect from='*' to='/404' />
      </Switch>
    );
  }
}

export default App;
