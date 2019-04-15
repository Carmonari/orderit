import React from 'react';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import ControlPanel from './ControlPanel';
import { withRouter } from 'react-router-native';
import styles from './css';

const SideDrawer = (props) => {
  return(
    <SideMenu menu={<ControlPanel history={props.history} />} isOpen={props.open}>
      <View style={styles.fondoGris}>
        {props.children}
      </View>
    </SideMenu>
  )
}

export default withRouter(SideDrawer);