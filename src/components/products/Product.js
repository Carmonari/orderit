import React from 'react';
import { View, Text } from 'react-native';
import { Card, Paragraph, IconButton  } from 'react-native-paper';
import styles from './css';

const Product = (props) => {
  const filtro = props.sections.filter(res => res.name == props.seccion && res.descuento > props.descuento);
  return(
    <View style={styles.margen15}>
      <Card style={styles.card} onPress={() => props.history.push(`/detail-product/${props._id}`)}>
        <Card.Cover source={{ uri: `http://10.0.2.2:5001/productos/${props.img}`}} />
        <Card.Title
          title={props.name}
          left={(props) => <IconButton size={20} icon="favorite" />}
        />
        <Card.Content>
          <Paragraph>${props.precio} {props.unidad}
          {
            typeof(filtro["0"]) === "object" ? 
            (<Text style={{color: 'red'}}> -{filtro["0"].descuento}%</Text>) : (
              props.descuento &&
              (<Text style={{color: 'red'}}> -{props.descuento}%</Text>)
            )
          }
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Product;