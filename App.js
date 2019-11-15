import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import store from './store';

import { setCurrentUser } from './src/actions/authActions';
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
import ProgramarEnvio  from './src/components/common/ProgramarEnvio';
import DetalleCompra from './src/components/perfil/DetalleCompra';
import Tracking from './src/components/common/Tracking';

//Check for token
AsyncStorage.getItem('jwtToken').then(token => {
  if(token){
    setAuthToken(token);
    const decode = jwt_decode(token);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));
  }
});  
//Set auth token header auth
//Decode token and get user inf and exp


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#41CE6C',
    background: '#F3F0EC'
  }
};

class App extends Component {
  state = {
    numItem: 0
  }

  componentDidMount(){
    SplashScreen.hide();
    this.sumItem()
  }

  sumItem = () => {
    AsyncStorage.getItem('CART', (err, res) => {
      let json = JSON.parse(res);
      if(json){
        let numberItems = Object.keys(json).length;
        this.setState({numItem: numberItems})
      }
    })
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
              <PrivateRoute exact path="/home" component={Home} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/products/:homeSeccion/:idHome" component={Products} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/detail-product/:idProduct" component={DetailProduct} addItem={this.sumItem} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/perfil-info" component={PerfilInfo} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/perfil" component={Perfil} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/direcciones" component={Direcciones} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/add-direccion" component={AddDir} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/edit-direccion/:idAdd" component={EditAdd} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/datos-facturacion" component={Facturas} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/add-facturas/:idBill" component={AddBills} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/pedidos" component={Pedidos} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/detalle-compra/:idCompra" component={DetalleCompra} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/favorites" component={Favorites} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/cart" component={Cart} numberItems={this.state.numItem} addItem={this.sumItem} />
              <PrivateRoute exact path="/programar-envio" component={ProgramarEnvio} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/search" component={Search} numberItems={this.state.numItem} />
              <PrivateRoute exact path="/tracking" component={Tracking} />
            </Switch>
          </Router>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;