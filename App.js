import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import { Provider as PaperProvider } from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';

import { setCurrentUser, logoutUser } from './src/actions/authActions';
import PrivateRoute from './src/components/common/PrivateRoute';
import setAuthToken from './src/utils/setAuthToken';
import Login from './src/components/log/Login';
import Register from './src/components/log/Register';
import ForgotPass from './src/components/log/ForgotPass';
import Home from './src/components/home/Home';

//Check for token
  AsyncStorage.getItem('jwtToken').then(token => {
    setAuthToken(token);
  })
   
  //Set auth token header auth
  //Decode token and get user infand exp
  AsyncStorage.getItem('jwtToken').then(token => {
    const decode = jwt_decode(token);
    //Set user and isAunthenticated
    store.dispatch(setCurrentUser(decode));
  })


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={ForgotPass} />
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
          </Router>
        </PaperProvider>
      </Provider>
    );
  }
}
