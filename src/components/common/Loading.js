import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Loading = () => (
  <ActivityIndicator size={38} animating={true} color={Colors.red800} />
);

export default Loading;