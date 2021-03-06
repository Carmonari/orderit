import React from 'react';
import { View, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { List, Avatar } from 'react-native-paper';
import styles from './css';
import isEmpty from '../../validation/is-empty';
import {logoutUser} from '../../actions/authActions';
import Boton from '../common/Boton';
import {connect} from 'react-redux';

const ControlPanel = (props) => {
  let image = isEmpty(props.infoUser.avatar) ? require('../../../assets/user.png') : ({ uri: `http://10.0.2.2:5000/${props.infoUser.avatar}` })
  return (
    <View style={{flex: 1}}>
      <View style={styles.fondoVerde}>
        <View>
          <Link to="/perfil-info" component={TouchableHighlight}>
            <View style={styles.viewImgEmail}>
              <Avatar.Image size={80} source={image} />
              <Text style={styles.textNombre}>{props.infoUser.name}</Text>
            </View>
          </Link>
        </View>
        <View style={styles.margen10}>
          <Text style={styles.colorBlanco}>{props.infoUser.email}</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#41CE6C', flex: 1, flexDirection: 'column', zIndex: -100}}>
        <ScrollView style={{overflow:'visible', flex: 1}}>
          <List.Section>
            <List.Item
              title="Home"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="home" color="#FFF" />}
              onPress={() => props.history.push('/home')}
            />
            <List.Item
              title="Favoritos"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="favorite" color="#FFF" />}
              onPress={() => props.history.push('/favorites')}
            />
            {
              props.home.homes.map(h => {
                return(
                  <List.Accordion
                    key={h._id}
                    title={h.name}
                    style={{backgroundColor:"#f0f0f0"}}
                  >
                  {
                  props.section.sections.map((v, i) => {
                    if(h.name === v.home){
                      return(
                        <List.Item
                          key={v._id}
                          title={v.name}
                          titleStyle={styles.colorBlanco}
                          left={props => <Image resizeMode="contain" style={{width: 30}} source={{uri: `http://orderit.mx/secciones/${v.img}`}} />}
                          onPress={() => props.history.push(`/products/seccion/${v.name}`)}
                        />
                      )
                    }
                  })}
                  </List.Accordion>
                )
              })
            }
          </List.Section>
        </ScrollView>
        <Boton mode='contained' onClick={() => props.logoutUser()} name='Logout' />
      </View>
    </View>
  )
}

export default connect(null, {logoutUser})(ControlPanel);