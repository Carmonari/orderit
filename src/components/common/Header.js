import React from "react";
import { Image, View } from "react-native";
import { Link, withRouter } from "react-router-native";
import { Appbar, withTheme, Avatar } from 'react-native-paper';

const Header = (props) => {
  const { colors } = props.theme;
  const menuBack = props.menu ? 'menu' : 'arrow-back';

  return(
    <Appbar.Header style={{backgroundColor: colors.background }}>
      <Appbar.Action
        icon={menuBack}
        onPress={props.open}
        size={33}
      />
      <Appbar.Content
        titleStyle={{flex: 1, textAlign: 'center'}}
        title={<Image style={{width: 125, height: 35}} source={require('../../../assets/orderit.png')} />}
        onPress={() => props.history.push('/home')}
      />
      <Link to='/search'>
        <Appbar.Action icon="search" size={33} />
      </Link>
      <Link to='/cart'>
        <View>
          <Avatar.Text style={{position: 'absolute', top: 0, right: 0, zIndex: 55}} size={24} label={props.carro} color="#FFF" />
          <Appbar.Action color="#41CE6C" icon="shopping-cart" size={33} />
        </View>
      </Link>
    </Appbar.Header>
  )
}

export default withTheme(withRouter(Header));