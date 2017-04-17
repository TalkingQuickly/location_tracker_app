// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Components/CustomNavBar'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import LocationHistoryScreen from '../Containers/LocationHistoryScreen'
import LocationHistoryMapScreen from '../Containers/LocationHistoryMapScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar type='replace' />
            <Scene key='locationHistory' component={LocationHistoryScreen} type='replace' title='Location History' />
            <Scene key='locationHistoryMap' component={LocationHistoryMapScreen} title='Location History Map' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
