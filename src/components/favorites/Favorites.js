import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Favorites extends Component {
  render() {
    return (
      <View>
        <Text> Favoritos </Text>
      </View>
    )
  }
}

Favorites.propTypes = {
  
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(Favorites)
