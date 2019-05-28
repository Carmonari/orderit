import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import { connect } from 'react-redux';

class Facturacion extends Component {
  
  back = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <View>
          <Text>Facturacion</Text>
        </View>
      </SideDrawer>
    )
  }
}

Facturacion.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Facturacion);