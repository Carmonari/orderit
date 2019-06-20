import React, { Component } from 'react';
import { View, Text, FlatList, Alert, ImageBackground } from 'react-native';
import { PropTypes } from 'prop-types';
import { FAB, Button, Switch, Divider } from 'react-native-paper';
import { Link } from 'react-router-native';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import Swipeable from 'react-native-swipeable-row';
import { getBills, deleteBill, changeStatusBill } from '../../actions/usersActions';
import { connect } from 'react-redux';

class Facturas extends Component {
  componentDidMount(){
    this.props.getBills();
  }
  
  back = () => {
    this.props.history.goBack();
  }

  eliminarBill(id){
    Alert.alert(
      'Confirmar',
      '¿Estas seguro que quieres eliminar esta factura?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Aceptar', onPress: () => {
          this.props.deleteBill(id)
        }},
      ],
      { cancelable: false }
    )
  }

  status = async (id) => {
    return await this.props.changeStatusBill(id);
  }

  render() {
    const { infoUser } = this.props.user;

    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <ImageBackground source={require('../../../assets/background.png')} style={[styles.imagenFondo, styles.flex1]}>
          <View style={{margin: 10, flex: 1}}>
            <View>
              <FlatList
                data={infoUser.facturas}
                extraData={this.props}
                legacyImplementation={true}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                  <Swipeable rightButtons={[
                    <Button 
                      style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}} 
                      icon="delete-forever" mode="Outlined" onPress={() => this.eliminarBill(item._id)}>
                      Eliminar
                    </Button>
                  ]} rightButtonWidth={135}>
                    <View style={{flex: 1, marginBottom: 15}}>
                      <View>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>@{item.name}</Text>
                      </View>  
                      <Link to={`/add-facturas/${item._id}`}>                 
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                              <Text>
                                {item.calle} {item.numero_ext} {item.numero_int} {item.municipio} {item.colonia} {item.cp}
                                {' '} {item.estado} {item.pais}
                              </Text>
                            </View>
                        </View>
                      </Link>
                      <View style={{alignItems: 'flex-start', flex: 1}}>
                        <Switch
                          value={item.status}
                          onValueChange={() => this.status(item._id)}
                        />
                      </View>
                    </View>
                    <Divider style={{backgroundColor: "#000", marginBottom: 10}} />
                  </Swipeable>
                )}
              />
            </View>
            <FAB
              style={{position: 'absolute', margin: 15, right: 0, bottom: 25, backgroundColor: "#41CE6C"}}
              small
              icon="add"
              onPress={() => this.props.history.push('/add-facturas/agregar')}
            />
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

Facturas.propTypes = {
  getBills: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired,
  changeStatusBill: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getBills, deleteBill, changeStatusBill })(Facturas);