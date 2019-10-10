import React, { Component } from 'react';
import { ScrollView, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-native';
import Header from '../common/Header';
import HomeLayout from './HomesLayout';
import SideDrawer from '../common/SideDrawer';
import { getHomes } from '../../actions/homesActions';
import { getSections } from '../../actions/sectionsActions';
import { getProfile } from '../../actions/usersActions';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount(){
    const { user } = this.props.auth;
    
    this.props.getHomes();
    this.props.getSections();
    this.props.getProfile(user.id);
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
  render() {
    const { homes } = this.props.home;
    let homesList;

    if(homes === null){
      homesList = '';
    } else{
      homesList = (
        homes.map((h, i) => {
          return (
            <Link key={h._id} to={`/products/home/${h.name}`}>
              <HomeLayout title={h.name} subtitle={h.subtitulo} img={h.img} />
            </Link>
          )
        })
      );
    }
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} carro={this.props.numberItems} />
        <ScrollView style={{flex: 1}}>
          {
            homesList
          }
        </ScrollView>
      </SideDrawer>
    )
  }
}

Home.propTypes = {
  getHomes: PropTypes.func.isRequired,
  getSections: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { getHomes, getSections, getProfile })(Home));