import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, IconButton, Divider  } from 'react-native-paper';
import styles from './css';

const Product = (props) => {
  let unidad;
  switch(props.unidad){
    case "Peso" :
      unidad = "Kg";
      break;
    case "Litros":
      unidad = "L";
      break;
    case "Pieza":
      unidad = "pza";
      break
    default:
      unidad = props.unidad;
  }
  const filtro = props.sections.filter(res => res.name == props.seccion && res.descuento > props.descuento);
  const icono = props.findUserLike(props.likes) ? (
    <TouchableOpacity onPress={() => props.unLike(props._id)} >
      <IconButton size={20} icon='favorite' color="#41CE6C" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => props.addLike(props._id)} >
      <IconButton size={20} icon='favorite-border' />
    </TouchableOpacity>
  );
  return(
    <View style={styles.margen15}>
      <Card style={styles.card} >
        <TouchableHighlight onPress={() => props.history.push(`/detail-product/${props._id}`)}>
          <Card.Cover source={{ uri: `http://orderit.mx/productos/${props.img}`}} />
        </TouchableHighlight>
        <Card.Title
          title={props.name}
          left={() => icono}
        />
        <Divider />
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            {
              typeof(filtro["0"]) === "object" ? 
              (<Text style={{color: 'red', flex: 1}}> -{filtro["0"].descuento}%</Text>) : (
                props.descuento &&
                (<Text style={{color: 'red', flex: 1}}> -{props.descuento}%</Text>)
              )
            }
            <Text style={{textAlign: 'right', flex: 2}}>${props.precio} {unidad}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Product;