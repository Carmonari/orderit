import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import store from './store';

import { setCurrentUser, logoutUser } from './src/actions/authActions';
import PrivateRoute from './src/components/common/PrivateRoute';
import setAuthToken from './src/utils/setAuthToken';
import Login from './src/components/log/Login';
import Register from './src/components/log/Register';
import ForgotPass from './src/components/log/ForgotPass';
import Home from './src/components/home/Home';
import Products from './src/components/products/Productos';
import PerfilInfo from './src/components/perfil/PerfilInfo';
import Perfil from './src/components/perfil/Perfil';
import DetailProduct from './src/components/products/DetailProduct';
import Favorites from './src/components/favorites/Favorites';
import Cart from './src/components/common/Cart';
import Direcciones from './src/components/perfil/Direcciones';
import AddDir from './src/components/perfil/AddDir';
import EditAdd from './src/components/perfil/EditAdd';
import Facturas from './src/components/perfil/Facturas';
import AddBills from './src/components/perfil/AddBills';
import Search from './src/components/search/Search';
import Pedidos from './src/components/perfil/Pedidos';
import { ProgramarEnvio } from './src/components/common/ProgramarEnvio';
import DetalleCompra from './src/components/perfil/DetalleCompra';

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

  componentDidMount() {
    SplashScreen.hide();
  }

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
              <PrivateRoute exact path="/products/:homeSeccion/:idHome" component={Products} />
              <PrivateRoute exact path="/detail-product/:idProduct" component={DetailProduct} />
              <PrivateRoute exact path="/perfil-info" component={PerfilInfo} />
              <PrivateRoute exact path="/perfil" component={Perfil} />
              <PrivateRoute exact path="/direcciones" component={Direcciones} />
              <PrivateRoute exact path="/add-direccion" component={AddDir} />
              <PrivateRoute exact path="/edit-direccion/:idAdd" component={EditAdd} />
              <PrivateRoute exact path="/datos-facturacion" component={Facturas} />
              <PrivateRoute exact path="/add-facturas/:idBill" component={AddBills} />
              <PrivateRoute exact path="/pedidos" component={Pedidos} />
              <PrivateRoute exact path="/detalle-compra/:idCompra" component={DetalleCompra} />
              <PrivateRoute exact path="/favorites" component={Favorites} />
              <PrivateRoute exact path="/cart" component={Cart} />
              <PrivateRoute exact path="/programar-envio" component={ProgramarEnvio} />
              <PrivateRoute exact path="/search" component={Search} />
            </Switch>
          </Router>
        </PaperProvider>
      </Provider>
    );
  }
}