import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import isEmpty from '../../validation/is-empty';
import { getOneShopping } from '../../actions/shoppingActions';
import { connect } from 'react-redux';

class DetalleCompra extends Component {
  componentDidMount(){
    this.props.getOneShopping(this.props.match.params.idCompra);
  }

  back = () => {
    this.props.history.goBack();
  }

  compra = () => {
    const { pedidos } = this.props.pedido;
    let dire = (<Text></Text>);
    let status = !pedidos.status ? 'PENDIENTE': 'ENTREGADO';
    let fecha, hora;
    let carrito = [];
    if(!isEmpty(pedidos.direccion)){
      if(!isEmpty(pedidos.entrega)){
        fecha = pedidos.entrega.substring(0,10);
        hora = pedidos.entrega.substring(11, 19);
      }
      dire = (
        <View>
          <Text>Enviado a: @{pedidos.direccion[0].name}</Text>
          <Text>{pedidos.direccion[0].calle} {pedidos.direccion[0].numero_ext}, {pedidos.direccion[0].colonia},
          {' '} {pedidos.direccion[0].cp} {pedidos.direccion[0].municipio}, {pedidos.direccion[0].estado}, {pedidos.direccion[0].pais}</Text>
        </View>
      );

      pedidos.cart.map(async (item) => {
        carrito.push(
          <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}} key={item._id}>
            <View style={{flex: 2}}>
              <Image resizeMode="contain" style={{width: 150, height: 80}} source={{uri: `http://10.0.2.2:5001/productos/${item.img}`}} />
            </View>
            <View style={{flex: 1}}>
              <Text>{item.name}</Text>
            </View>
            <View style={{flex: 1 , flexDirection: 'row'}}>
              <Text>{item.cantidad} x </Text>
              <Text>{item.precio}</Text>
            </View>
          </View>
        )
      })
    }
    return(
      <View>
        <View>
          <Text># {pedidos.idCompra}</Text>
          { dire }
          <Text>{status}</Text>
          <Text>{fecha} {hora}</Text>
        </View>
        <ScrollView>
          { carrito }
        </ScrollView>
      </View>
    )
    
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <View style={{margin: 10, flex: 1}}>
          <View>
            {
              this.compra()
            }
          </View>
        </View>
      </SideDrawer>
    )
  }
}

DetalleCompra.propTypes = {
  getOneShopping: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  pedido: state.pedido
});

export default connect(mapStateToProps, { getOneShopping })(DetalleCompra);