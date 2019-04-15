import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  fondoGris: {
    backgroundColor: '#fdfdfd',
    minHeight: Dimensions.get('window').height
  },
  fondoGrisOxford: {
    backgroundColor: '#828282'
  },
  viewImgEmail: {
    margin: 10,
    flexDirection: 'row'
  },
  textNombre: {
    alignSelf: 'center',
    marginLeft: 10,
    color:"#FFF"
  },
  colorBlanco: {
    color: "#FFF"
  },
  margen10: {
    margin: 10
  },
  
});

export default styles;