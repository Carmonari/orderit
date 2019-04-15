import React from 'react';
import { View, Text } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import styles from './css';

const ControlPanel = (props) => {
  return (
    <View>
      <View style={styles.fondoGrisOxford}>
        <View style={styles.viewImgEmail}>
          <Avatar.Image size={80} source={require('../../../assets/user.png')} />
          <Text style={styles.textNombre}>Carlos</Text>
        </View>
        <View style={styles.margen10}>
          <Text style={styles.colorBlanco}>charlie@teorema-studio.com</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#41CE6C'}}>
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
          />
          <List.Accordion
            title="Alimentos"
            style={{backgroundColor:"#f0f0f0"}}
          >
            <List.Item
              title="Frutas"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="favorite" color="#FFF" />}
            />
            <List.Item
              title="Verduras"
              titleStyle={styles.colorBlanco}
              left={props => <List.Icon {...props} icon="favorite" color="#FFF" />}
              />
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  )
}

export default ControlPanel;