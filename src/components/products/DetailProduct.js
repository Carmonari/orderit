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
import Loading from '../common/Loading';
import styles from './css';
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
    const { detailProduct, loading } = this.props.product;
    let icono;
    let rait = this.props.product.rating ? this.props.product.rating.avgRaiting : 0;

    if(!isEmpty(detailProduct)){
      icono = this.findUserLike(detailProduct.likes) ? (
        <TouchableOpacity onPress={() => this.unLike()} style={styles.likes} >
          <IconButton size={30} icon='favorite' color="#41CE6C" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => this.addLike()} style={styles.likes} >
          <IconButton size={30} icon='favorite-border' />
        </TouchableOpacity>
      );
    }

    let load = loading ? (
      <View style={styles.loading}>
        <Loading />
      </View>
    ) : (
      <View style={styles.contGeneral}>
        <View>
          <Image resizeMode="cover" style={styles.img} source={{ uri: `http://orderit.mx/productos/${detailProduct.img}`}} />
          {
            icono
          }
        </View>
        <View style={styles.flex1}>
          <View style={styles.contDatos}>
            <View>
              <Text style={styles.textoNombre}>{detailProduct.name}</Text>
              <Text>{detailProduct.tipo}</Text>
            </View>
            <View>
              <Text style={[styles.colorTexto, styles.textoNombre]}>${detailProduct.precio}</Text>
            </View>
          </View>
          <ScrollView style={styles.flex1}>
            <View style={styles.contDesc}>
              <Text style={styles.font15}>{detailProduct.descripcion}</Text>
            </View>
          </ScrollView>
          <View style={styles.contAdd}>
            <View style={styles.contIconAdd}>
              <IconButton icon="remove" size={27} onPress={this.rest} />
              <View style={styles.textoCant}>
                <Text style={styles.font21}>{this.state.cantidad}</Text>
              </View>
              <IconButton icon="add" size={27} onPress={this.add} />
            </View>
            <View>
              <Boton style={styles.borderR15} mode="contained" onClick={() => this.agregar(detailProduct)} name="Agregar" />
            </View>
          </View>
          <View style={styles.rating}>
              <AirbnbRating
                defaultRating={rait}
                showRating={false}
                size={18}
                selectedColor="#41CE6C"
                isDisabled={true}
              />
            </View>
          <Snackbar
            style={styles.backColor}
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            duration={3500}
          > 
            Se ha agregado al carrito de compras con éxito
          </Snackbar>
        </View>
      </View>
    )

    return(
      <SideDrawer>
        <Header menu={false} open={this.back} carro={this.props.numberItems} />
        {load}
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