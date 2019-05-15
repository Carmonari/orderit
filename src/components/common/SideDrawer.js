import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import SideMenu from 'react-native-side-menu';
import ControlPanel from './ControlPanel';
import { withRouter } from 'react-router-native';
import styles from './css';
import { connect } from 'react-redux';

const SideDrawer = (props) => {
  return(
    <SideMenu menu={<ControlPanel history={props.history} home={props.home} section={props.section} {...props.user} />} isOpen={props.open}>
      <View style={styles.fondoGris}>
        {props.children}
      </View>
    </SideMenu>
  )
}

SideDrawer.propTypes = {
  section: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  section: state.section,
  home: state.home,
  user: state.user
})

export default withRouter(connect(mapStateToProps)(SideDrawer));