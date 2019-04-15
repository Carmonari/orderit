import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './css';

const HomeLayout = ({ title, subtitle, img }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={img} />
      <View style={styles.text}>
        <Text style={styles.title}>- {title} -</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export default HomeLayout;