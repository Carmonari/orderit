import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  colorTexto: {
    color: '#41CE6C'
  },
  backColor: {
    backgroundColor: '#41CE6C'
  },
  font15: {
    fontSize: 15
  },
  font21: {
    fontSize: 21
  },
  borderR15: {
    borderRadius: 15
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
  },

  /* Loading */
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },

  /* Contenedor verde */
  divVerde: {
    backgroundColor: '#41CE6C',
    marginRight: 10
  },
  textoDiv: {
    color: "#FFF",
    margin: 5,
    fontSize: 12
  },

  /* Anuncio de fav */
  anuncio: {
    backgroundColor: '#41CE6C',
    position: 'absolute',
    bottom: 0
  },

  /*
    Detalle de producto
  */

  contGeneral: {
    flex: 1,
    marginBottom: 30
  },
  contDatos: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between'
  },
  contDesc: {
    flex: 1,
    marginLeft: 50,
    marginBottom: 50,
    marginRight: 10,
  },
  contAdd: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#F3F0EC'
  },
  contIconAdd: {
    flex: 1,
    flexDirection: 'row'
  },
  textoNombre: {
    fontWeight: 'bold',
    fontSize: 18
  },
  likes: {
    position: 'absolute',
    bottom: 0
  },
  img: {
    width: "100%",
    height: 350
  },
  rating: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingRight: 15
  },
  textoCant: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default styles;