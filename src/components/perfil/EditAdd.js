import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import { connect } from 'react-redux';
import InputText from '../common/InputText';
import { getOneAddress, editAddress } from '../../actions/usersActions';

class EditAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      calle: '',
      numero_ext: '',
      numero_int: '',
      cp: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: ''
    }
  }

  componentDidMount(){
    this.props.getOneAddress(this.props.match.params.idAdd);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.direccion !== this.props.user.direccion){
      const { name, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = nextProps.user.direccion;
      this.setState({
        name,
        calle,
        numero_ext,
        numero_int,
        cp,
        colonia,
        municipio,
        estado,
        pais
      })
    }
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
    const { name, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = this.state;

    const editAdd = {
      name,
      calle,
      numero_ext,
      numero_int,
      cp,
      colonia,
      municipio,
      estado,
      pais
    }

    this.props.editAddress(this.props.match.params.idAdd, editAdd, this.props.history);
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <View style={{margin: 10, flex: 1}}>
          <ScrollView>
            <InputText
              label="Nombre"
              value={this.state.name}
              name="name"
              onChange={this.onChange}
              placeholder="Nombre"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Calle"
              value={this.state.calle}
              name="calle"
              onChange={this.onChange}
              placeholder="Calle"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Numero exterior"
              value={this.state.numero_ext}
              name="numero_ext"
              onChange={this.onChange}
              placeholder="Numero exterior"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Numero interior"
              value={this.state.numero_int}
              name="numero_int"
              onChange={this.onChange}
              placeholder="Numero interior"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="CP"
              value={this.state.cp}
              name="cp"
              onChange={this.onChange}
              placeholder="CP"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Colonia"
              value={this.state.colonia}
              name="colonia"
              onChange={this.onChange}
              placeholder="Colonia"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Municipio"
              value={this.state.municipio}
              name="municipio"
              onChange={this.onChange}
              placeholder="Municipio"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Estado"
              value={this.state.estado}
              name="estado"
              onChange={this.onChange}
              placeholder="Estado"
              style={[styles.margenT10, styles.margenH10]}
            />
            <InputText
              label="Pais"
              value={this.state.pais}
              name="pais"
              onChange={this.onChange}
              placeholder="Pais"
              style={styles.margen10}
            />
            <View style={[styles.margen10, styles.margenB30]}>
              <Button mode="contained" onPress={this.guardar}>
                Guardar
              </Button>
            </View>
          </ScrollView>
        </View>
      </SideDrawer>
    )
  }
}

EditAdd.propTypes = {
  getOneAddress: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getOneAddress, editAddress })(EditAdd);