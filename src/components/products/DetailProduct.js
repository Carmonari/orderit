import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import SideDrawer from '../common/SideDrawer';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../common/Header';
import { Button, IconButton, Snackbar  } from 'react-native-paper';
import { getProduct } from '../../actions/productActions';
import { connect } from 'react-redux';

class DetailProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      cantidad: 1,
      visible: false
    }
  }

  componentDidMount(){
    this.props.getProduct(this.props.match.params.idProduct);
  }

  back = () => {
    this.props.history.goBack();
  }

  rest = () => {
    if(this.state.cantidad > 1){
      sumar = this.state.cantidad - 1;
      this.setState({
        cantidad: sumar
      });
    }
  }

  add = () => {
    sumar = this.state.cantidad + 1;
    this.setState({
      cantidad: sumar
    });
  }

  agregar = async (product) => {
    product['quantity'] = this.state.cantidad;
    try {
      let res = await AsyncStorage.getItem('CART');
      if(!res){
        await AsyncStorage.setItem('CART', JSON.stringify([product]));
      } else {
        let items = JSON.parse(res);
        items.push(product);
        await AsyncStorage.setItem('CART', JSON.stringify(items))
      }
      this.setState({visible: true});
      
    } catch (err) {
      console.error(err)
    }
  }

  render(){
    const { detailProduct } = this.props.product;

    return(
      <SideDrawer >
        <Header menu={false} open={this.back} />
        <View>
          <View>
            <Image resizeMode="cover" style={{width: "100%", height: 350}} source={{ uri: `http://10.0.2.2:5001/productos/${detailProduct.img}`}} />
            <IconButton style={{position: 'absolute', bottom: 0}} icon="favorite" size={20} />
          </View>
          <View>
            <View style={{flexDirection: 'row', margin: 15, justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{detailProduct.name}</Text>
                <Text>{detailProduct.tipo}</Text>
              </View>
              <View>
                <Text style={{color: "#41CE6C", fontWeight: 'bold', fontSize: 18}}>${detailProduct.precio}</Text>
              </View>
            </View>

            <View style={{marginHorizontal: 15, marginBottom: 15}}>
              <Text>{detailProduct.descripcion}</Text>
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <IconButton icon="remove" size={20} onPress={this.rest} />
                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30}}>
                  <Text>{this.state.cantidad}</Text>
                </View>
                <IconButton icon="add" size={20} onPress={this.add} />
              </View>
              <View>
                <Button mode="contained" onPress={() => this.agregar(detailProduct)}>
                  Agregar
                </Button>
              </View>
            </View>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => this.setState({ visible: false })}
              duration={3500}
            > Se ha agregado al carrito de compras con éxito </Snackbar>
          </View>
        </View>
      </SideDrawer>
    )
  }
}

DetailProduct.propTypes = {
  getProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProduct })(DetailProduct);