import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  text: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 32
  },
  subtitle: {
    textAlign: 'center',
    color: '#fdfdfd',
    fontSize: 16,
    fontWeight: '100',
    fontStyle: 'italic'
  },
  card: {
    marginBottom: 5,
    elevation: 2,
  }
});

export default styles;