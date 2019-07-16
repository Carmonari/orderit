import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import Boton from '../common/Boton';
import InputText from '../common/InputText';
import { addBills, getOneBill, editBill } from '../../actions/usersActions';
import { connect } from 'react-redux';

class AddBills extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      tipo_persona: '',
      razon_social: '',
      calle: '',
      numero_ext: '',
      numero_int: '',
      cp: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: '',
      update: this.props.match.params.idBill === 'agregar' ? false : true
    }
  }

  componentDidMount(){
    if(this.state.update){
      this.props.getOneBill(this.props.match.params.idBill)
    }
    BackHandler.addEventListener('hardwareBackPress', this.back);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.facturas !== this.props.user.facturas){
      const { name, razon_social, tipo_persona, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = nextProps.user.facturas;
      this.setState({
        name,
        tipo_persona,
        razon_social,
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
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  guardar = () => {
    const { name, razon_social, tipo_persona, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = this.state;

    const editBill = {
      name,
      tipo_persona,
      razon_social,
      calle,
      numero_ext,
      numero_int,
      cp,
      colonia,
      municipio,
      estado,
      pais
    }

    if(!this.state.update){
      this.props.addBills(editBill, this.props.history);
    } else {
      this.props.editBill(this.props.match.params.idBill, editBill, this.props.history);
    }
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <ImageBackground source={require('../../../assets/background.png')} style={[styles.imagenFondo, styles.flex1]}>
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
                label="Tipo de persona jurídica"
                value={this.state.tipo_persona}
                name="tipo_persona"
                onChange={this.onChange}
                placeholder="física o moral"
                style={[styles.margenT10, styles.margenH10]}
              />
              <InputText
                label="Razón social"
                value={this.state.razon_social}
                name="razon_social"
                onChange={this.onChange}
                placeholder="Razón social"
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
            </ScrollView>
            <View style={[styles.margen10, styles.fijo]}>
              <Boton mode="contained" onPress={this.guardar} name="Guardar" />
            </View>
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

AddBills.propTypes = {
  addBills: PropTypes.func.isRequired,
  getOneBill: PropTypes.func.isRequired,
  editBill: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { addBills, getOneBill, editBill })(AddBills);