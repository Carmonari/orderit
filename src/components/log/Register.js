import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import styles from './css';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: ''
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
                <View style={styles.flex1}>
                    <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
                </View>
                <View style={styles.form}>
                    <InputText
                        name='name'
                        label='Nombre'
                        value={this.state.name}
                        onChange={this.onChange}
                        placeholder="Nombre"
                        error={false}
                    />
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
                    <InputText
                        name='password2'
                        label='Password'
                        value={this.state.password2}
                        onChange={this.onChange}
                        placeholder="Password"
                        password={true}
                        error={false}
                    />
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
                        Guardar
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

export default Register;