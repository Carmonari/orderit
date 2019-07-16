import React, { Component } from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { addLike, unLike, getProductSearch } from '../../actions/productActions';
import { connect } from 'react-redux';
import Product from '../products/Product';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount(){
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
    this.props.addLike(id, this.state.homeSeccion, this.state.idHome);
  }

  unLike = (id) => {
    this.props.unLike(id, this.state.homeSeccion, this.state.idHome);
  }

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  buscar = (text) => {
    if(text.length >= 3){
      let buscador = {
        search: text
      }
      this.props.getProductSearch(buscador);
    }
  }

  render(){
    const { products } = this.props.product;
    const { sections } = this.props.section;

    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <View style={{flex: 1}}>
          <View>
            <Searchbar
              placeholder="Buscar"
              onChangeText={query => { this.buscar(query) }}
            />
          </View>
          <View>
            <FlatList
              data={products}
              numColumns="2"
              renderItem={({item}) => <Product {...item} key={item._id} addLike={this.addLike} unLike={this.unLike} findUserLike={this.findUserLike}
                                        history={this.props.history} sections={sections} /> }
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </SideDrawer>
    )
  }
}

Search.propTypes = {
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  section:PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  section: state.section
})

export default connect(mapStateToProps, { addLike, unLike, getProductSearch })(Search);