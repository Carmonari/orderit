import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import Product from './Product';

class Products extends Component {
  state = {
    open: false
  }
  
  openClose = () => {
    this.setState({
      open: true
    })
  }

  render() {
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          numColumns="2"
          renderItem={({item}) => <Product key={item.key} /> }
        />
      </SideDrawer>
    )
  }
}

Products.propTypes = {

}

export default Products;