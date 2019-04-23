import React from 'react';
import { View, Text } from 'react-native';
import { Card, Paragraph, IconButton  } from 'react-native-paper';
import styles from './css';

const Product = (props) => {
  return(
    <View style={styles.margen15}>
      <Card style={styles.card}>
        <Card.Cover source={require('../../../assets/helado.png')} />
        <Card.Title
          title="Helado"
          left={(props) => <IconButton size={20} icon="favorite" />}
        />
        <Card.Content>
          <Paragraph>$30 pieza <Text style={{color: 'red'}}> -10%</Text></Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Product;