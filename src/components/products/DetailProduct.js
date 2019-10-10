import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import SideDrawer from '../common/SideDrawer';
import { AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../common/Header';
import { IconButton, Snackbar  } from 'react-native-paper';
import Boton from '../common/Boton';
import isEmpty from '../../validation/is-empty';
import { getProduct, productRating, addLike, unLike } from '../../actions/productActions';
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
    BackHandler.addEventListener('hardwareBackPress', this.back);
    this.props.productRating(this.props.match.params.idProduct);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
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
      this.props.addItem()
      
    } catch (err) {
      console.error(err)
    }
  }

  addLike = () => {
    this.props.addLike(this.props.match.params.idProduct);
  }

  unLike = () => {
    this.props.unLike(this.props.match.params.idProduct);
  }

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render(){
    const { detailProduct } = this.props.product;
    let icono;
    let rait = this.props.product.rating ? this.props.product.rating.avgRaiting : 0;

    if(!isEmpty(detailProduct)){
      icono = this.findUserLike(detailProduct.likes) ? (
        <TouchableOpacity onPress={() => this.unLike()} style={{position: 'absolute', bottom: 0}} >
          <IconButton size={30} icon='favorite' color="#41CE6C" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => this.addLike()} style={{position: 'absolute', bottom: 0}} >
          <IconButton size={30} icon='favorite-border' />
        </TouchableOpacity>
      );
    }

    return(
      <SideDrawer>
        <Header menu={false} open={this.back} carro={this.props.numberItems} />
        <View style={{flex: 1, marginBottom: 30}}>
          <View>
            <Image resizeMode="cover" style={{width: "100%", height: 350}} source={{ uri: `http://orderit.mx/productos/${detailProduct.img}`}} />
            {
              icono
            }
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', margin: 15, justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>{detailProduct.name}</Text>
                <Text>{detailProduct.tipo}</Text>
              </View>
              <View>
                <Text style={{color: "#41CE6C", fontWeight: 'bold', fontSize: 18}}>${detailProduct.precio}</Text>
              </View>
            </View>
            <ScrollView style={{flex: 1}}>
              <View style={{marginLeft: 50, marginBottom: 50, marginRight: 10, flex: 1}}>
                <Text style={{fontSize: 15}}>{detailProduct.descripcion}</Text>
              </View>
            </ScrollView>
            <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between',
                         position: 'absolute', bottom: 25, backgroundColor: '#F3F0EC'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <IconButton icon="remove" size={27} onPress={this.rest} />
                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30}}>
                  <Text style={{fontSize: 21}}>{this.state.cantidad}</Text>
                </View>
                <IconButton icon="add" size={27} onPress={this.add} />
              </View>
              <View>
                <Boton style={{borderRadius: 15}} mode="contained" onClick={() => this.agregar(detailProduct)} name="Agregar" />
              </View>
            </View>
            <View style={{position: 'absolute', bottom: 0, right: 0, paddingRight: 15 }}>
                <AirbnbRating
                  defaultRating={rait}
                  showRating={false}
                  size={18}
                  selectedColor="#41CE6C"
                  isDisabled={true}
                />
              </View>
            <Snackbar
              style={{backgroundColor: '#41CE6C'}}
              visible={this.state.visible}
              onDismiss={() => this.setState({ visible: false })}
              duration={3500}
            > 
              Se ha agregado al carrito de compras con éxito
            </Snackbar>
          </View>
        </View>
      </SideDrawer>
    )
  }
}

DetailProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  productRating: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
})

export default connect(mapStateToProps, { getProduct, productRating, addLike, unLike })(DetailProduct);