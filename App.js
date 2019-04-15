import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
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
import Products from './src/components/products/Productos';

//Check for token
AsyncStorage.getItem('jwtToken').then(token => {
  setAuthToken(token);
});
  
//Set auth token header auth
//Decode token and get user infand exp
AsyncStorage.getItem('jwtToken').then(token => {
  const decode = jwt_decode(token);
  //Set user and isAunthenticated
  store.dispatch(setCurrentUser(decode));
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#41CE6C',
    background: '#F3F0EC'
  }
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={ForgotPass} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/products" component={Products} />
            </Switch>
          </Router>
        </PaperProvider>
      </Provider>
    );
  }
}