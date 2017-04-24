// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../../Shared/Redux/LoginRedux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  handlePressLocationHistory= () => {
    this.toggleDrawer()
    NavigationActions.locationHistory()
  }

  handlePressLocationMap = () => {
    this.toggleDrawer()
    NavigationActions.locationHistoryMap({screen_param: 'test value'})
  }

  handlePressLogout = () => {
    this.toggleDrawer()
    this.props.attemptLogout(this.onLogoutSuccess)
  }

  onLogoutSuccess = () => {
    NavigationActions.login()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Location History' onPress={this.handlePressLocationHistory} />
        <DrawerButton text='Location Map' onPress={this.handlePressLocationMap} />
        <DrawerButton text='Logout' onPress={this.handlePressLogout} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: (onSuccess) => dispatch(LoginActions.logout(onSuccess))
  }
}

export default connect(null, mapDispatchToProps)(DrawerContent)
