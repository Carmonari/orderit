import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { getProductsForHome } from '../../actions/productActions';
import { connect } from 'react-redux';
import Product from './Product';
import styles from './css';

class Products extends Component {
  state = {
    open: false
  }

  componentDidMount(){
    this.props.getProductsForHome(this.props.match.params.idHome)
  }
  
  openClose = () => {
    this.setState({
      open: true
    })
  }

  render() {
    const { products } = this.props.product;

    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <View style={styles.flex1}>
          <FlatList
            data={products}
            numColumns="2"
            renderItem={({item}) => <Product {...item} key={item._id} history={this.props.history} /> }
            keyExtractor={(item) => item._id}
          />
        </View>
      </SideDrawer>
    )
  }
}

Products.propTypes = {
  getProductsForHome: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProductsForHome })(Products);