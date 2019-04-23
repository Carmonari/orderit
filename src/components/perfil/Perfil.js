import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Avatar } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import InputText from '../common/InputText';

class Perfil extends Component {
  state = {
    open: false,
    name: '',
    aPaterno: '',
    aMaterno: '',
    cel: '',
    email: ''
  }
  
  back = () => {
    this.props.history.goBack();
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <SideDrawer open={this.state.open}>
        <Header menu={false} open={this.back} />
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Avatar.Image size={128} source={require('../../../assets/user.png')} />
          </View>
          <View style={{backgroundColor: '#FFF', margin: 20}}>
            <InputText
              label="Nombre"
              value={this.state.name}
              name="name"
              onChange={this.onChange}
              placeholder="Nombre"
              style={{marginTop: 10, marginHorizontal: 10}}
            />
            <InputText
              label="Apellido paterno"
              value={this.state.aPaterno}
              name="aPaterno"
              onChange={this.onChange}
              placeholder="Apellido paterno"
              style={{marginTop: 10, marginHorizontal: 10}}
            />
            <InputText
              label="Apellido materno"
              value={this.state.aMaterno}
              name="aMaterno"
              onChange={this.onChange}
              placeholder="Apellido Materno"
              style={{marginTop: 10, marginHorizontal: 10}}
            />
            <InputText
              label="Teléfono celular"
              value={this.state.cel}
              name="cel"
              onChange={this.onChange}
              placeholder="Teléfono celular"
              keyboardType="numeric"
              style={{marginTop: 10, marginHorizontal: 10}}
            />
            <InputText
              label="Email"
              value={this.state.email}
              name="email"
              onChange={this.onChange}
              placeholder="Email"
              style={{margin: 10}}
            />
          </View>
        </View>
      </SideDrawer>
    )
  }
}

Perfil.propTypes = {

}

export default Perfil;