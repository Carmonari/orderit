import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image, ImageBackground } from 'react-native';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import Boton from '../common/Boton';
import styles from './css';
import { forgotPass } from '../../actions/usersActions';
import { connect } from 'react-redux';

class ForgotPass extends Component {
  state = {
    email: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({
            errors: nextProps.errors
        })
    }
  }

  onChange = (name, value) => {
    this.setState({
        [name]: value
    })
  }

  forgot = event => {
    const forgot = {
      email: this.state.email
    }
    
    this.props.forgotPass(forgot, this.props.history);
  }

  render(){
    const dimensions = Dimensions.get('window');
    const imgWidth = dimensions.width;
    const { errors } = this.state;

  return(
    <ImageBackground source={require('../../../assets/background.png')} style={styles.imagenFondo}>
      <View style={styles.container}>
        <View style={styles.flex2}>
            <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
        </View>
        <View style={styles.flex1}>
          <InputText
              name='email'
              label={errors.email ? errors.email : 'Email'}
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              error={errors.email && true}
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

ForgotPass.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { forgotPass })(ForgotPass);