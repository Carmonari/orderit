import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, Paragraph, IconButton, Divider  } from 'react-native-paper';
import styles from './css';

const Product = (props) => {
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
          <Card.Cover source={{ uri: `http://10.0.2.2:5001/productos/${props.img}`}} />
        </TouchableHighlight>
        <Card.Title
          title={props.name}
          left={() => icono}
        />
        <Divider />
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>${props.precio} {props.unidad}</Text>
            {
              typeof(filtro["0"]) === "object" ? 
              (<Text style={{color: 'red'}}> -{filtro["0"].descuento}%</Text>) : (
                props.descuento &&
                (<Text style={{color: 'red'}}> -{props.descuento}%</Text>)
              )
            }
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Product;