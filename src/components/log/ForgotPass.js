import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import styles from './css';

class ForgotPass extends Component {
  state = {
    email: ''
  }

  onChange = (name, value) => {
    this.setState({
        [name]: value
    })
  }

  render(){
    const dimensions = Dimensions.get('window');
    const imgWidth = dimensions.width;

  return(
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
          <Button style={styles.marginV} mode="contained" onPress={() => console.log('Pressed')}>
            Enviar
          </Button>
          <Link to="/" >
            <Button mode="contained" color="#E12801">
              Cancelar
            </Button>
          </Link>
        </View>
      </View>
    )
  }
}

export default ForgotPass;