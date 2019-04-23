import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import Product from './Product';
import styles from './css';

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
        <View style={styles.flex1}>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}]}
            numColumns="2"
            renderItem={({item}) => <Product key={item.key} /> }
          />
        </View>
      </SideDrawer>
    )
  }
}

Products.propTypes = {

}

export default Products;