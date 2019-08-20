import React from "react";
import { Image } from "react-native";
import { Link, withRouter } from "react-router-native";
import { Appbar, withTheme } from 'react-native-paper';

const Header = (props) => {
  const { colors } = props.theme;
  const menuBack = props.menu ? 'menu' : 'arrow-back'
  return(
    <Appbar.Header style={{backgroundColor: colors.background }}>
      <Appbar.Action
        icon={menuBack}
        onPress={props.open}
      />
      <Appbar.Content
        titleStyle={{flex: 1, textAlign: 'center'}}
        title={<Image style={{width: 125, height: 35}} source={require('../../../assets/orderit.png')} />}
        onPress={() => props.history.push('/home')}
      />
      <Link to='/search'>
        <Appbar.Action icon="search" />
      </Link>
      <Link to='/cart'>
        <Appbar.Action color="#41CE6C" icon="shopping-cart" />
      </Link>
    </Appbar.Header>
  )
}

export default withTheme(withRouter(Header));