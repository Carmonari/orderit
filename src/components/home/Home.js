import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-native';
import Header from '../common/Header';
import HomeLayout from './HomesLayout';
import SideDrawer from '../common/SideDrawer';

class Home extends Component {
  state = {
    open: false
  }
  
  openClose = () => {
    this.setState({
      open: true
    })
  }
  render() {
    const homes = [
      {
        img: require('../../../assets/home-market.png'),
        title: 'Supermaket',
        subtitle: 'Comprar tu super'
      },
      {
        img: require('../../../assets/homes-celulares.png'),
        title: 'Electrónicos',
        subtitle: 'Comprar tu super'
      },
      {
        img: require('../../../assets/homes-ropayaccesorios.png'),
        title: 'Ropa y accesorios',
        subtitle: 'Subtitulo'
      }
    ];
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <ScrollView>
          {
            homes.map(h => {
              return (
                <Link key={h.title} to="/products">
                  <HomeLayout title={h.title} subtitle={h.title} img={h.img} />
                </Link>
              )
            })
          }
        </ScrollView>
      </SideDrawer>
    )
  }
}

Home.propTypes = {

}

export default Home;