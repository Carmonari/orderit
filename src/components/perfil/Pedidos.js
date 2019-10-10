import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import { Divider } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import isEmpty from '../../validation/is-empty';
import Boton from '../common/Boton';
import { getShopping } from '../../actions/shoppingActions';
import { connect } from 'react-redux';

class Pedidos extends Component {
  componentDidMount(){
    this.props.getShopping();
    BackHandler.addEventListener('hardwareBackPress', this.back);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
  }

  pedidos = () => {
    const { pedidos } = this.props.pedido;
    let compras = (
      <Text></Text>
    );

    if(!isEmpty(pedidos) && Array.isArray(pedidos)){
      compras = pedidos.map((item) => {
        return(
          <View key={item._id} style={{marginBottom: 15}}>
            <Text>ORDERIT: {item.idCompra}</Text>
            <Text>Enviado a: @{item.direccion[0].name}</Text>
            <Text style={{textAlign: 'right'}}>Total: ${item.total}</Text>
            <Boton style={{marginBottom: 10, borderRadius: 15}}  mode="contained" onClick={() => this.props.history.push(`/detalle-compra/${item.idCompra}`)} name="Detalles" />
            <Divider style={{backgroundColor: '#FFF', marginVertical: 15}} />
          </View>
        )
      })
    }

    return compras;
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} carro={this.props.numberItems} />
        <ImageBackground source={require('../../../assets/background.png')} style={[styles.imagenFondo, styles.flex1]}>
          <View style={{margin: 10, flex: 1}}>
            <ScrollView>
              {
                this.pedidos()
              }
            </ScrollView>
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

Pedidos.propTypes = {
  getShopping: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  pedido: state.pedido
});

export default connect(mapStateToProps, { getShopping })(Pedidos);