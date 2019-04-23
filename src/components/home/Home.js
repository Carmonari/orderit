import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-native';
import Header from '../common/Header';
import HomeLayout from './HomesLayout';
import SideDrawer from '../common/SideDrawer';
import { getHomes } from '../../actions/homesActions'; 
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    open: false
  }

  componentDidMount(){
    this.props.getHomes();
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
            <Link key={h.name} to="/products">
              <HomeLayout title={h.name} subtitle={h.subtitulo} img={h.img} />
            </Link>
          )
        })
      );
    }
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <ScrollView>
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
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, { getHomes })(Home);