import React, { Component } from 'react';
import { View, Dimensions, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import Boton from '../common/Boton';
import styles from './css';
import { forgotPass } from '../../actions/usersActions';
import { connect } from 'react-redux';

class ForgotPass extends Component {
  state = {
    email: ''
  }

  onChange = (name, value) => {
    this.setState({
        [name]: value
    })
  }

  forgot = () => {
    const forgot = {
      email: this.state.email
    }

    this.props.forgotPass(forgot, this.props.history);
  }

  render(){
    const dimensions = Dimensions.get('window');
    const imgWidth = dimensions.width;

  return(
    <ImageBackground source={require('../../../assets/background.png')} style={styles.imagenFondo}>
      <View style={styles.container}>
        <View style={styles.flex2}>
            <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
        </View>
        <View style={styles.flex1}>
          <InputText
              name='email'
              label='Email'
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              error={false}
          />
          <Boton style={styles.marginV} mode="contained" name="Enviar" onClick={this.forgot} />
          <Link to="/" >
            <Boton mode="outlined" name="Cancelar" textColor="#000" onClick={() => this.props.history.goBack()}  />
          </Link>
        </View>
      </View>
    </ImageBackground>
    )
  }
}

export default connect(null, { forgotPass })(ForgotPass);