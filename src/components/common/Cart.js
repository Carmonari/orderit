import React, { Component } from 'react'
import { View, Image, Text, ScrollView, Alert, BackHandler, Dimensions } from 'react-native';
import { List, IconButton, Divider } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import SideDrawer from '../common/SideDrawer';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../common/Header';
import { getAddress } from '../../actions/usersActions';
import { addShopping } from '../../actions/shoppingActions';
import Boton from '../common/Boton';
import { connect } from 'react-redux';

import PayPal from 'react-native-paypal-wrapper';
PayPal.initialize(PayPal.SANDBOX, "AbRCF2nU4tnsR7Hgn69oUoVK3Zkar-ruPtcSi_74r4EvWLgDH8WTeyOjX15YyWpcMewXHE6r90fkncms");

//Android
import { PaymentRequest } from 'react-native-payments';

const METHOD_DATA = [{
  supportedMethods: ['android-pay'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    currencyCode: 'USD',
    environment: 'TEST', // defaults to production
    paymentMethodTokenizationParameters: {
      tokenizationType: 'Direct',
      parameters: {
        protocolVersion: 'ECv1',
        publicKey: 'BIf3kxX3/0wKiJt/x7dyxajA/17pHfkOAnoKum77BvFYVE3LwbWDiGgjLTtE7CyDaT64dtzGXnfS+YbIxvcVITE=',
      },
    },
  },
}];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: { currency: 'USD', value: '15.00' }
    }
  ],
  total: {
    label: 'Merchant Name',
    amount: { currency: 'USD', value: '15.00' }
  }
};

const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartItems: [],
      entrega: [],
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    this.props.getAddress();
    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    });
    AsyncStorage.getItem("ENTREGA", (err, res) => {
      if (!res) this.setState({entrega: []});
      else this.setState({entrega: JSON.parse(res)});
    });
    BackHandler.addEventListener('hardwareBackPress', this.back);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
  }

  removeItemPressed = (item) => {
    Alert.alert(
      'Eliminar '+item.name,
      '¿Estas seguro que quieres elimar este articulo del carrito de compra?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.removeItem(item)},
      ]
    )
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.cartItems.map((item) => {
      if(JSON.stringify(item) !== JSON.stringify(itemToRemove) )
        items.push(item);
    });
    this.setState({cartItems: items});
    AsyncStorage.setItem("CART", JSON.stringify(items));
    this.props.addItem()
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      let total = item.precio * item.quantity;
      items.push(
        <View key={`${item._id}-${item.quantity}-${i}`}>
          <List.Item
            onPress={() =>  this.props.history.push(`/detail-product/${item._id}`)}
            title={`${item.quantity}x ${item.name}`}
            description={
              <Text>
                {item.tipo} {"\n"}
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#41ce6c'}}>${item.precio} x {item.quantity} = ${total.toFixed(2)}</Text>
              </Text>
              }
            left={
              props => (
              <Image resizeMode='contain' {...props} style={{width: 100, height: 100}} source={{ uri: `http://orderit.mx/productos/${item.img}`}} />)
            }
            right={props => <IconButton size={30} icon="remove-circle-outline" onPress={() => this.removeItemPressed(item)} />}
          />
        </View>
      );
    });
    return items;
  }

  subtotal = () => {
    let subtotal = 0;
    this.state.cartItems.map((item, i) => {
      let total = item.precio * item.quantity;
      subtotal += total;
    })
    return subtotal
  }

  removeAll() {
    this.setState({cartItems: [], entrega: []})
    AsyncStorage.setItem("CART",JSON.stringify([]));
    AsyncStorage.setItem("ENTREGA",JSON.stringify([]));
    this.props.addItem()
  }

  alerta = (idCompra) => {
    Alert.alert(
      'Se ha ejecutado la compra con éxito ',
      'Ir a: ',
      [
        {
          text: 'Home',
          onPress: () => this.props.history.push('/home')
        },
        {
          text: 'Mi compra',
          onPress: () => this.props.history.push(`/detalle-compra/${idCompra}`)
        },
      ],
      {cancelable: false},
    );
  }

  render(){
    const subtotal = this.subtotal().toFixed(2);
    let comision = (subtotal * 0.08).toFixed(2);
    const envio = subtotal <= 1000 ? 200 : 0; 
    let total = subtotal + comision + envio;
    total = parseFloat(total).toFixed(2);
    return (
      <SideDrawer >
        <Header menu={false} open={this.back} carro={this.props.numberItems} />
        <View style={{flex: 1, paddingBottom: 30, backgroundColor: '#FFF'}}>
          <ScrollView style={{marginBottom: 150}}>
            {
              this.renderItems()
            }
            <View style={{flex: 1, margin: 10}}>
              <Text style={{color: "#41CE6C"}}>ORDEN DE COMPRA</Text>
              <Divider />
              <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                <Text>Subtotal: ${subtotal}</Text>
                <Text>Comisión: ${comision}</Text>
                <Text>Envío express: ${envio}</Text>
                <Text style={{color: "#000"}}>Total: ${total}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={{margin: 10, position: 'absolute', bottom: 30, width: '95%'}}>
            <Boton style={{marginBottom: 10, borderRadius: 15}} icon="date-range" mode="contained" onClick={() => this.props.history.push('/programar-envio')} name="Programar entrega" />
            <Boton style={{marginBottom: 10, borderRadius: 15}} icon="payment" mode="contained" onClick={() => this.checkoutPaypal()} name="Paypal" />
            <Boton style={{borderRadius: 15}} icon="android" mode="contained" onClick={() => this.checkoutAndroid()} name="Android pay" />
          </View>
        </View>
      </SideDrawer>
    )
  }

  pagoExpressProgram = (infoUser, cart, indice, total, fechaEntrega, address = null) => {
    let newPedido = {}
    this.state.cartItems.map((item, i) => {
      let totalP = 0.0;
      totalP = parseFloat(item.precio) * parseFloat(item.quantity);
      total = total + totalP;
      cart.push({
        product: item._id,
        name: item.name,
        img: item.img,
        cantidad: item.quantity,
        precio: item.precio
      })
    });
    PayPal.pay({
      price: `${total}`,
      currency: 'MXN',
      description: "Costo total",
    }).then(confirm => {
      if(confirm.response.state === 'approved'){
        if(address && !fechaEntrega){
          newPedido = {
            idCompra: confirm.response.id,
            total: total,
            cart,
            direccion: [{
              name: 'Ubicación',
              calle: address['calle'],
              numero_ext: address['numero_ext'],
              numero_int: address['numero_int'],
              colonia: address['colonia'],
              municipio: address['municipio'],
              estado: address['estado'],
              pais: address['pais'],
              cp: address['cp']
            }],
            entrega: fechaEntrega
          }
        } else {
          newPedido = {
            idCompra: confirm.response.id,
            total: total,
            cart,
            direccion: [{
              name: infoUser.direcciones[indice].name,
              calle: infoUser.direcciones[indice].calle,
              numero_ext: infoUser.direcciones[indice].numero_ext,
              numero_int: infoUser.direcciones[indice].numero_int,
              colonia: infoUser.direcciones[indice].colonia,
              municipio: infoUser.direcciones[indice].municipio,
              estado: infoUser.direcciones[indice].estado,
              pais: infoUser.direcciones[indice].pais,
              cp: infoUser.direcciones[indice].cp
            }],
            entrega: fechaEntrega
          }
        }
          this.props.addShopping(newPedido)
          this.removeAll()
          if(fechaEntrega){
            this.alerta(confirm.response.id);
          } else {
            AsyncStorage.setItem("MAP", 'true');
            this.props.history.push('/tracking')
          }
        }
    }).catch(error => console.log(error));
  }

  checkoutPaypal = async () => {
    let address = [];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000,  maximumAge: 1000 },
    )
    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyDcS03AM2Nh90g0VTGxA-5KN98scaz6eqw')
    .then((response) => response.json())
    .then((responseJson) => {
      //console.warn('ADDRESS GEOCODE is BACK!! => ' + responseJson.results[0]);
      responseJson.results[0].address_components.map(item => {
        if(item.types[0] === 'street_number'){
          address["numero_ext"] = item.long_name
        } else if(item.types[0] === 'route'){
          address["calle"] = item.long_name
        } else if(item.types[0] === 'sublocality_level_1'){
          address["colonia"] = item.long_name
        } else if(item.types[0] === 'locality'){
          address["municipio"] = item.long_name
        } else if(item.types[0] === 'administrative_area_level_1'){
          address["estado"] = item.long_name
        } else if(item.types[0] === 'country'){
          address["pais"] = item.long_name
        } else if(item.types[0] === 'postal_code'){
          address["cp"] = item.long_name
        }
      })
    })

    const { infoUser } = this.props.user
    let total = 0.0;
    let cart = [];
    let nombreDire = '';
    let indice = 0;
    let sToA = null;
    let aDonde = "direcciones"
    const entrega = await AsyncStorage.getItem("ENTREGA", (err, res) => {
      !res ? null : JSON.parse(res)
    });
    if(infoUser.direcciones.length > 0 && (entrega !== '[[]]' && entrega !== '[]' && entrega !== null)){
      let getIndex = infoUser.direcciones.map(dire => dire.status.toString()).indexOf('true');
      indice = getIndex !== -1 ? getIndex : 0;
      nombreDire = infoUser.direcciones[indice].name;
      sToA = entrega.slice(2,-2);
    } else{
      nombreDire = 'Mi ubicación ¿esta de acuerdo?'
      aDonde = "change-address"
    }

    Alert.alert(
      'Nombre de la dirección que se enviará: a ',
      nombreDire,
      [
        {text: 'Cambiar dirección', onPress: () => this.props.history.push(`/${aDonde}`)},
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Aceptar', onPress: () => this.pagoExpressProgram(infoUser, cart, indice, total, sToA, address)}
      ],
      { cancelable: false }
    )
  }

  checkoutAndroid() {
    paymentRequest.show().then((response) => {
      console.warn(response)
    }).catch((err) => {
      console.warn(err);
    })
    //Actions.checkout({cartItems: this.state.cartItems});
  }
}

Cart.propTypes = {
  getAddress: PropTypes.func.isRequired,
  addShopping: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { getAddress, addShopping })(Cart);
