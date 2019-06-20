import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { getProductsForHome, getProductsForSection, addLike, unLike } from '../../actions/productActions';
import { connect } from 'react-redux';
import Product from './Product';
import styles from './css';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      homeSeccion: '',
      idHome: ''
    }
  }

  componentDidMount(){
    if(this.props.match.params.homeSeccion === 'home'){
      this.props.getProductsForHome(this.props.match.params.idHome)
    } else{
      this.props.getProductsForSection(this.props.match.params.idHome);
    }

    this.setState({
      homeSeccion: this.props.match.params.homeSeccion,
      idHome: this.props.match.params.idHome
    })
  }

  componentWillReceiveProps(nextProps){    
    if(nextProps.match.params.idHome !== this.props.match.params.idHome){
      if(nextProps.match.params.homeSeccion === 'home'){
        this.props.getProductsForHome(nextProps.match.params.idHome)
      } else{
        this.props.getProductsForSection(nextProps.match.params.idHome);
      }
      this.setState({
        homeSeccion: nextProps.match.params.homeSeccion,
        idHome: nextProps.match.params.idHome,
        open: false
      })
    }
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
            renderItem={({item}) => <Product {...item} key={item._id} addLike={this.addLike} unLike={this.unLike} findUserLike={this.findUserLike}
                                      history={this.props.history} sections={sections} /> }
            keyExtractor={(item) => item._id}
          />
        </View>
      </SideDrawer>
    )
  }
}

Products.propTypes = {
  getProductsForHome: PropTypes.func.isRequired,
  getProductsForSection: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  section: state.section
})

export default connect(mapStateToProps, { getProductsForHome, getProductsForSection, addLike, unLike })(Products);