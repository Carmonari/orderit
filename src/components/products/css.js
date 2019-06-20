import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  margen15: {
    margin: 15
  },
  margenB15:{
    marginBottom: 15
  },
  card: {
    width: Dimensions.get('window').width/2.35,
    height: 300
  }
});

export default styles;