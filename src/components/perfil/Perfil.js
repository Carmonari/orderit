import React, { Component } from 'react';
import { View, TouchableHighlight, ImageBackground } from 'react-native';
import { PropTypes } from 'prop-types';
import { Avatar, Button } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import InputText from '../common/InputText';
import styles from '../common/css';
import ImagePicker from 'react-native-image-picker';
import isEmpty from '../../validation/is-empty';
import Boton from '../common/Boton';
import { getProfile, editProfile } from '../../actions/usersActions';
import { connect } from 'react-redux';

class Perfil extends Component {
  state = {
    _id: '',
    name: '',
    aPaterno: '',
    aMaterno: '',
    cel: '',
    email: '',
    avatar: ''
  }

  componentDidMount(){
    let { user } = this.props.auth
    this.props.getProfile(user.id);

    let { _id, name, email, aPaterno, aMaterno, cel, avatar } = this.props.user.infoUser;

    this.setState({
      _id,
      name,
      email,
      aMaterno,
      aPaterno,
      cel,
      avatar: { uri: `http://10.0.2.2:5000/${avatar}` }
    })
  }
  
  back = () => {
    this.props.history.goBack();
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  guardar = () => {
    const editProfile = {
      name: this.state.name,
      email: this.state.email,
      aPaterno: this.state.aPaterno,
      aMaterno: this.state.aMaterno,
      cel: this.state.cel
    }
    let { user } = this.props.auth

    this.props.editProfile(user.id, editProfile, this.props.history);
  }

  image = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.error) {
      console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      console.warn('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri }
        this.setState({ avatar: source })
        console.log('User selected a file form camera or gallery', response);
        const data = new FormData();
        data.append('id', this.state._id);
        data.append('name', response.fileName);
        data.append('fileData', {
          uri : response.uri,
          type: response.type,
          name: response.fileName,
        });
        const config = {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
        };
        fetch("http://10.0.2.2:5000/api/users/upload", config)
        .then((checkStatusAndGetJSONResponse) => {       
          console.log(checkStatusAndGetJSONResponse);
        }).catch((err)=>{console.log(err)});
      }
    })
  }

  render() {
    let image = isEmpty(this.state.avatar) ? require('../../../assets/user.png') : this.state.avatar
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <ImageBackground source={require('../../../assets/background.png')} style={styles.imagenFondo}>
          <View style={styles.flex1}>
            <View style={[styles.alginCenter, styles.margenT20]}>
              <TouchableHighlight onPress={ () => this.image() } >
                <Avatar.Image size={120} source={image} />
              </TouchableHighlight>
            </View>
            <View style={styles.margen20}>
              <InputText
                label="Nombre"
                value={this.state.name}
                name="name"
                onChange={this.onChange}
                placeholder="Nombre"
                style={[styles.margenT10, styles.margenH10]}
              />
              <InputText
                label="Apellido paterno"
                value={this.state.aPaterno}
                name="aPaterno"
                onChange={this.onChange}
                placeholder="Apellido paterno"
                style={[styles.margenT10, styles.margenH10]}
              />
              <InputText
                label="Apellido materno"
                value={this.state.aMaterno}
                name="aMaterno"
                onChange={this.onChange}
                placeholder="Apellido Materno"
                style={[styles.margenT10, styles.margenH10]}
              />
              <InputText
                label="Teléfono celular"
                value={this.state.cel}
                name="cel"
                onChange={this.onChange}
                placeholder="Teléfono celular"
                keyboardType="numeric"
                style={[styles.margenT10, styles.margenH10]}
              />
              <InputText
                label="Email"
                value={this.state.email}
                name="email"
                onChange={this.onChange}
                placeholder="Email"
                style={styles.margen10}
              />
              <View style={styles.margen10}>
                <Boton mode="contained" onPress={this.guardar} name="Guardar" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

Perfil.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, { getProfile, editProfile })(Perfil);