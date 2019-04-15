import React from "react";
import { Image } from "react-native";
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
      />
      <Appbar.Action icon="search" onPress={this._onSearch} />
      <Appbar.Action color="#41CE6C" icon="shopping-cart" onPress={this._onMore} />
    </Appbar.Header>
  )
}

export default withTheme(Header);