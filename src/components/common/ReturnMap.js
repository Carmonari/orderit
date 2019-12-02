import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'react-router-native';

const ReturnMap = (props) => {
  return (
    <View 
      style={{
        backgroundColor: '#41CE6C',
        flex: 1,
        width: '95%',
        position: 'absolute',
        height: 40,
        bottom: 10,
        right: 10,
      }}
    >
      <Link to="/tracking">
        <Text style={{color: "#FFF", marginTop: 5, fontSize: 18, textAlign: 'center'}}>Regresar al mapa</Text>
      </Link>
    </View>
  )
}
export default ReturnMap
