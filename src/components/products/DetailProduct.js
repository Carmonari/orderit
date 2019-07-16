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
  }

  ratingCompleted = (rating) => {
    const rait = {
      rating
    }
    
    this.props.productRating(this.props.match.params.idProduct, rait);
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

  findUserRating = (raiting) => {
    const { auth } = this.props;
    if(raiting.filter(rait => rait.user === auth.user.id).length > 0){
      return true;
    } else {
      return false;
    }
  }

  render(){
    const { detailProduct } = this.props.product;
    const { user } = this.props.auth
    let icono, index;
    let rat = 0;

    if(!isEmpty(detailProduct)){
      icono = this.findUserLike(detailProduct.likes) ? (
        <TouchableOpacity onPress={() => this.unLike()} style={{position: 'absolute', bottom: 0}} >
          <IconButton size={20} icon='favorite' color="#41CE6C" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => this.addLike()} style={{position: 'absolute', bottom: 0}} >
          <IconButton size={20} icon='favorite-border' />
        </TouchableOpacity>
      );
      
      index = detailProduct.raiting.findIndex(rait => rait.user.toString() === user.id);
      rat = index > -1 ? detailProduct.raiting[index].rait : 0
    }

    return(
      <SideDrawer >
        <Header menu={false} open={this.back} />
        <View style={{flex: 1, marginBottom: 30}}>
          <View>
            <Image resizeMode="cover" style={{width: "100%", height: 350}} source={{ uri: `http://10.0.2.2:5001/productos/${detailProduct.img}`}} />
            {
              icono
            }
            <View style={{ paddingVertical: 10, position: 'absolute', bottom: 0, right: 15 }}>
              <AirbnbRating
                defaultRating={rat}
                showRating={false}
                size={25}
                selectedColor="#41CE6C"
                onFinishRating={this.ratingCompleted}
              />
            </View>
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
                         position: 'absolute', bottom: 0, backgroundColor: '#F3F0EC'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <IconButton icon="remove" size={20} onPress={this.rest} />
                <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30}}>
                  <Text>{this.state.cantidad}</Text>
                </View>
                <IconButton icon="add" size={20} onPress={this.add} />
              </View>
              <View>
                <Boton mode="contained" onClick={() => this.agregar(detailProduct)} name="Agregar" />
              </View>
            </View>
            <Snackbar
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