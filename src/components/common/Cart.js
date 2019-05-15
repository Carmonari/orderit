import React, { Component } from 'react'
import { View, Image, Text, ScrollView, Alert } from 'react-native';
import { List, IconButton, Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import SideDrawer from '../common/SideDrawer';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../common/Header';

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartItems: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('CART', (err, res) => {
      if (!res) this.setState({cartItems: []});
      else this.setState({cartItems: JSON.parse(res)});
    });
  }

  back = () => {
    this.props.history.goBack();
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
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <View key={`${item._id}-${item.quantity}-${i}`}>
          <List.Item
            onPress={() =>  this.props.history.push(`/detail-product/${item._id}`)}
            title={`${item.quantity}x ${item.name}`}
            description={
              <Text>
                {item.tipo} {"\n"}
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#41ce6c'}}>${item.precio}</Text>
              </Text>
              }
            left={
              props => (
              <Image resizeMode='contain' {...props} style={{width: 100, height: 100}} source={{ uri: `http://10.0.2.2:5001/productos/${item.img}`}} />)
            }
            right={props => <IconButton size={30} icon="remove-circle-outline" onPress={() => this.removeItemPressed(item)} />}
          />
        </View>
      );
    });
    return items;
  }

  render(){
    return (
      <SideDrawer >
        <Header menu={false} open={this.back} />
        <View style={{flex: 1, paddingBottom: 30}}>
          <ScrollView>
            {
              this.renderItems()
            }
            <View style={{margin: 10}}>
              <Button style={{marginBottom: 10}} icon="payment" mode="contained" onPress={() => console.log('Pressed')}>
                Paypal
              </Button>
              <Button icon="android" mode="contained" onPress={() => console.log('Pressed')}>
                Android pay
              </Button>
            </View>
          </ScrollView>
        </View>
      </SideDrawer>
    )
  }
}

export default Cart
