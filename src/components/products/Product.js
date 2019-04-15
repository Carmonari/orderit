import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const Product = (props) => {
  return(
    <View>
      <Card>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title>Platano</Title>
          <Paragraph>$30 pieza</Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Product;