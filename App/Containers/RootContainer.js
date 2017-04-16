// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import StartupNativeActions from '../Redux/StartupNativeRedux'
import ReduxPersist from '../Config/ReduxPersist'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startupNative()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  startupNative: () => dispatch(StartupNativeActions.startupNative())
})

export default connect(null, mapStateToDispatch)(RootContainer)
