import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import styles from './css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/home');
        }

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

    handleLogin = event => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user.email + ' - ' + user.password);

        this.props.loginUser(user);
    }
    
    render() {
        const dimensions = Dimensions.get('window');
        const imgWidth = dimensions.width;

        const { errors } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.flex2}>
                    <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
                </View>
                <View style={styles.form}>
                    <InputText
                        name='email'
                        label={errors.email ? errors.email : 'Email'}
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Email"
                        error={errors.email && true}
                    />
                    <InputText
                        name='password'
                        label={errors.password ? errors.password : 'Password'}
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Password"
                        password={true}
                        error={errors.password && true}
                    />
                    <Button mode="contained" onPress={this.handleLogin}>
                        Login
                    </Button>
                    <Link to="/register" >
                        <Button mode="contained">
                            Registrarse
                        </Button>
                    </Link>
                </View>
                <View style={styles.forgot}>
                    <Link to="/forgot" ><Text>¿Olvidaste la contraseña?</Text></Link>
                </View>
            </View>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);