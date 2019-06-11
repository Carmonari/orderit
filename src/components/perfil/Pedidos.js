import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import isEmpty from '../../validation/is-empty';
import { getShopping } from '../../actions/shoppingActions';
import { connect } from 'react-redux';

class Pedidos extends Component {
  componentDidMount(){
    this.props.getShopping();
  }

  back = () => {
    this.props.history.goBack();
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
            <Text>Total: ${item.total}</Text>
            <Button mode="contained" onPress={() => this.props.history.push(`/detalle-compra/${item._id}`)}>detalles</Button>
          </View>
        )
      })
    }

    return compras;
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <View style={{margin: 10, flex: 1}}>
          <ScrollView>
            {
              this.pedidos()
            }
          </ScrollView>
        </View>
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