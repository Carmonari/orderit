import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import SideMenu from 'react-native-side-menu';
import ControlPanel from './ControlPanel';
import { withRouter } from 'react-router-native';
import styles from './css';
import { getSections } from '../../actions/sectionsActions';
import { connect } from 'react-redux';

const SideDrawer = (props) => {
  return(
    <SideMenu menu={<ControlPanel history={props.history} home={props.home} section={props.section} {...props.auth} />} isOpen={props.open}>
      <View style={styles.fondoGris}>
        {props.children}
      </View>
    </SideMenu>
  )
}

SideDrawer.propTypes = {
  getSections: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  section: state.section,
  home: state.home
})

export default withRouter(connect(mapStateToProps, { getSections })(SideDrawer));