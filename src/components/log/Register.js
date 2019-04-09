import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'react-router-native';
import InputText from '../common/InputText';
import { connect } from 'react-redux';
import { addUser } from '../../actions/usersActions';
import styles from './css';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
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

    guardar = event => {
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.addUser(newUser, this.props.history);
    }

    render(){
        const dimensions = Dimensions.get('window');
        const imgWidth = dimensions.width;
        const { errors } = this.state;

        return(
            <View style={styles.container}>
                <View style={styles.flex1}>
                    <Image resizeMode="center" style={{width: imgWidth}} source={require('../../../assets/orderit.png')} />
                </View>
                <View style={styles.form}>
                    <InputText
                        name='name'
                        label={errors.name ? errors.name : 'Nombre'}
                        value={this.state.name}
                        onChange={this.onChange}
                        placeholder="Nombre"
                        error={errors.name && true}
                    />
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
                    <InputText
                        name='password2'
                        label={errors.password2 ? errors.password2 : 'Password'}
                        value={this.state.password2}
                        onChange={this.onChange}
                        placeholder="Password"
                        password={true}
                        error={errors.password2 && true}
                    />
                    <Button mode="contained" onPress={this.guardar}>
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

Register.propTypes = {
    addUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors
})

export default connect(mapStateToProps, { addUser })(Register);