import React, { Component } from 'react'
import { View, FlatList, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { getFav, addLike, unLike } from '../../actions/productActions';
import Product from '../products/Product';
import { connect } from 'react-redux';
import styles from '../products/css';

class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount(){
    this.props.getFav();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.history.goBack(); // works best when the goBack is async
    return true;
  }

  openClose = () => {
    this.setState({
      open: true
    })
  }

  addLike = (id) => {
    this.props.addLike(id, "fav");
  }

  unLike = (id) => {
    this.props.unLike(id, "fav");
  }

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { products } = this.props.product;
    const { sections } = this.props.section;

    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <View style={[styles.flex1, styles.margenB15]}>
          <FlatList
            data={products}
            numColumns="2"
            renderItem={({item}) => <Product {...item} key={item._id} addLike={this.addLike} unLike={this.unLike}
                                      history={this.props.history} sections={sections} findUserLike={this.findUserLike} /> }
            keyExtractor={(item) => item._id}
          />
        </View>
      </SideDrawer>
    )
  }
}

Favorites.propTypes = {
  getFav: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  product: state.product,
  section: state.section,
  auth: state.auth
})

export default connect(mapStateToProps, { getFav, addLike, unLike })(Favorites)
