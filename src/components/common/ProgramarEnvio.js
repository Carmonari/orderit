import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import SideDrawer from './SideDrawer';
import Header from './Header';
import Boton from '../common/Boton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

class ProgramarEnvio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      entrega: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.back);
    AsyncStorage.getItem("ENTREGA", (err, res) => {
      if (!res) this.setState({entrega: []});
      else this.setState({entrega: JSON.parse(res)});
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    let newDate = date.toString().split(' ').slice(0,5).join(' ');
    this.setState({
      entrega: newDate
    })
  };

  eliminar = () => {
    AsyncStorage.setItem("ENTREGA",JSON.stringify([]));
    this.setState({entrega: []});
  }

  guardar = () => {
    var entrega = this.state.entrega;
    AsyncStorage.getItem("ENTREGA", (err, res) => {
      AsyncStorage.setItem("ENTREGA", JSON.stringify([entrega]));
    });
    //console.warn(this.state.entrega)
    this.props.history.push('/cart');
  }

  render() {
    const fecha = new Date();
    const fechaFin = new Date();
    let fecha3meses = fechaFin.setMonth(fechaFin.getMonth() + 3);

    return (
      <SideDrawer>
        <Header menu={false} open={this.back} carro={this.props.numberItems}/>
        <View style={{flex: 1}}>
          <View style={{margin: 15}}>
            <Boton style={{borderRadius: 15}} mode="contained" onClick={this._showDateTimePicker} name="Seleccionar fecha y hora de entrega" />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode='datetime'
              date={fecha}
              minimumDate={fecha}
              maximumDate={fecha3meses}
            />
            <Text>{this.state.entrega}</Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10, position: 'absolute', bottom: 30}}>
            <Boton mode="outline" style={{
                flex: 1, margin: 5, borderRadius: 15
              }} textColor="#000" onClick={() => this.props.history.goBack()} name="Cancelar" />
            <Boton mode="contained" style={{
                flex: 1, margin: 5, borderRadius: 15, backgroundColor: 'red'
              }} onClick={() => this.eliminar()} name="Eliminar" />
            <Boton mode="contained" style={{flex: 1, margin: 5, borderRadius: 15}} onClick={() => this.guardar()} name="Guardar" />
          </View>
        </View>
      </SideDrawer>
    )
  }
}

ProgramarEnvio.propTypes = {
  
}

export default ProgramarEnvio;
