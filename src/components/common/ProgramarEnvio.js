import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import SideDrawer from './SideDrawer';
import Header from './Header';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

export class ProgramarEnvio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      entrega: ''
    }
  }

  back = () => {
    this.props.history.goBack();
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
        <Header menu={false} open={this.back} />
        <View>
          <Button mode="contained" onPress={this._showDateTimePicker}>
            Seleccionar fecha y hora de entrega
          </Button>
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
          <View style={{flexDirection: 'row', margin: 10}}>
            <Button mode="contained" style={{flex: 1, margin: 5}} onPress={() => this.props.history.goBack()}>
              Cancelar
            </Button>
            <Button mode="contained" style={{flex: 1, margin: 5}} onPress={() => this.guardar()}>
              Guardar
            </Button>
          </View>
        </View>
      </SideDrawer>
    )
  }
}

ProgramarEnvio.propTypes = {
  
}

export default ProgramarEnvio;
