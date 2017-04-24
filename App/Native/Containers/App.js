// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../../Shared/I18n/I18n' // keep before root container
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'
import config from '../Config/AppConfig'
import StartupActions from '../../Shared/Redux/StartupRedux'
import StartupNativeActions from '../../Native/Redux/StartupNativeRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Apply config overrides
applyConfigSettings()

// setup callbacks, sagas should never know about navigation
const callbacks = {
  onLoggedIn: () => NavigationActions.locationHistory,
  onLoggedOut: () => NavigationActions.login
}

//create the store
const store = createStore(
  StartupNativeActions.startupNative(callbacks)
)

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentWillMount() {
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
