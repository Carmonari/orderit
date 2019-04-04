import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import styles from './css';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    
    onChange = (name, value) => {
        this.setState({
            [name]: value
         })
    }
    
    render() {
        const dimensions = Dimensions.get('window');
        const imgWidth = dimensions.width;

        return (
            <View style={styles.container}>
                <View style={styles.flex2}>
                    <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
                </View>
                <View style={styles.form}>
                    <InputText
                        name='email'
                        label='Email'
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Email"
                        error={false}
                    />
                    <InputText
                        name='password'
                        label='Password'
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Password"
                        password={true}
                        error={false}
                    />
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
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

export default Login;