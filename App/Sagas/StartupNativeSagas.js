import { call, select } from 'redux-saga/effects'
import { is } from 'ramda'
import BackgroundGeolocation from 'react-native-background-geolocation'
import config from '../Config/AppConfig'
import {Actions as NavigationActions} from 'react-native-router-flux'

// exported to make available for tests
export const selectToken = (state) => state.login.token


export function * startupNative (api, { callbacks } ) {
  const token = yield select(selectToken)
  if (token === undefined) {
    yield call(callbacks.onLoggedOut)
  } else {
    yield call(api.setAuthToken, token)
    const { baseUrl } = config
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: false, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      batchSync: true,
      url: `${baseUrl}locations`,
      //autoSync: true,         // <-- POST each location immediately to server
      params: {               // <-- Optional HTTP params
        "token": token
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    })
    yield call(callbacks.onLoggedIn())
  }
}
