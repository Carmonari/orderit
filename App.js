import React, { Component } from 'react';
import { NativeRouter as Router, Route, Switch } from "react-router-native";

import Login from './src/components/log/Login';
import Register from './src/components/log/Register';
import ForgotPass from './src/components/log/ForgotPass';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot" component={ForgotPass} />
        </Switch>
      </Router>
    );
  }
}
