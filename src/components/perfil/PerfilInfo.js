import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import { Avatar, List } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/usersActions';
import styles from '../common/css';
import isEmpty from '../../validation/is-empty';

class PerfilInfo extends Component {
  state = {
    open: false,
    avatar: ''
  }

  componentDidMount(){
    const { user } = this.props.auth;

    this.props.getProfile(user.id);
    const { infoUser } = this.props.user;

    this.setState({ avatar: { uri: `http://10.0.2.2:5000/${infoUser.avatar}`}})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.history.goBack(); // works best when the goBack is async
    return true;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.infoUser.avatar !== this.props.user.infoUser.avatar){
      this.setState({ avatar: { uri: `http://10.0.2.2:5000/${nextProps.user.infoUser.avatar}`}})
    }
  }
  
  openClose = () => {
    this.setState({
      open: true
    })
  }
  render() {
    let image = isEmpty(this.state.avatar) ? require('../../../assets/user.png') : this.state.avatar
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={true} open={this.openClose} />
        <ImageBackground source={require('../../../assets/background.png')} style={styles.imagenFondo}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Avatar.Image size={128} source={image} />
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
                    left={() => <List.Icon icon="location-on" />}
                    onPress={() => this.props.history.push('/direcciones')}
                  />
                  <List.Item
                    title="Datos de facturación"
                    left={() => <List.Icon icon="account-balance" />}
                    onPress={() => this.props.history.push('/datos-facturacion')}
                  />
                  <List.Item
                    title="Formas de pago"
                    left={() => <List.Icon icon="credit-card" />}
                  />
                  <List.Item
                    title="Tus pedidos"
                    left={() => <List.Icon icon="shopping-basket" />}
                    onPress={() => this.props.history.push('/pedidos')}
                  />
                  <List.Item
                    title="Logout"
                    left={() => <List.Icon icon="eject" />}
                    onPress={() => this.props.logoutUser()}
                  />
                </List.Section>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

PerfilInfo.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, { logoutUser, getProfile })(PerfilInfo);