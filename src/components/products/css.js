import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  margen15: {
    marginRight: 10,
    marginTop: 10
  },
  margenB15:{
    marginBottom: 30,
    marginLeft: 10
  },
  card: {
    width: Dimensions.get('window').width/2.15,
    height: 300
  }
});

export default styles;