import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-native';
import { Avatar, List } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';

class PerfilInfo extends Component {
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
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Avatar.Image size={128} source={require('../../../assets/user.png')} />
          </View>
          <View >
            <ScrollView>
              <List.Section style={{backgroundColor: '#FFF', margin: 20}}>
                <List.Item
                  title="Mi información"
                  left={() => <List.Icon icon="account-circle" />}
                  onPress={() => this.props.history.push('/perfil')}
                />
                <List.Item
                  title="Direcciones"
                  left={() => <List.Icon color="#000" icon="location-on" />}
                />
                <List.Item
                  title="Datos de facturación"
                  left={() => <List.Icon color="#000" icon="account-balance" />}
                />
                <List.Item
                  title="Formas de pago"
                  left={() => <List.Icon color="#000" icon="credit-card" />}
                />
                <List.Item
                  title="Tus pedidos"
                  left={() => <List.Icon color="#000" icon="shopping-basket" />}
                />
                <List.Item
                  title="Logout"
                  left={() => <List.Icon color="#000" icon="eject" />}
                  onPress={() => this.props.logoutUser()}
                />
              </List.Section>
            </ScrollView>
          </View>
        </View>
      </SideDrawer>
    )
  }
}

PerfilInfo.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(PerfilInfo);