// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import BackgroundGeolocation from 'react-native-background-geolocation'

// Actions
import LocationHistoryActions from '../Redux/LocationHistoryRedux'

// Styles
import styles from './Styles/LocationHistoryScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class LocationHistoryScreen extends React.Component {
	onLocation(location) {
    console.log('- [js]location: ', JSON.stringify(location));
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }

	componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }

  componentWillMount() {
    console.log("this has been triggered")
    this.props.attemptGetRecentlyVisited()
		BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // Now configure the plugin.
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
      url: 'http://localhost:3001/locations',
      //autoSync: true,         // <-- POST each location immediately to server
      params: {               // <-- Optional HTTP params
        "token": "35385967362628273646"
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  render () {
    console.log("render has been triggered")
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>This is where the location history will go</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetRecentlyVisited: () => dispatch(LocationHistoryActions.visitedCitiesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHistoryScreen)
