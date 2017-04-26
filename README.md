#  TravelTracker - Open Source GPS Logger

Travel Tracker is an open source GPS logger focussed on tracking the
countries you visit and where you go while you're there. Both the React
Native iOS / Android applications and the Rails API server are open
source. A hosted version will be available in June 2017.

This application was also used as the example application for the
Railsconf 2017 talk on how to structure a single react codebase for
maximum code re-use across web and native mobile.

The inital app structure was generated using [Ignite](https://github.com/infinitered/ignite).

## Getting ready for React

First follow the React Native getting started guide here:
<https://facebook.github.io/react-native/docs/getting-started.html>

## Setting up for development

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install dependencies with `yarn install`


## Running in development (native)

The default development configuration expects an API server running on
`http://localhost:3000` you can find the example API server here:
<https://github.com/TalkingQuickly/location_tracker_api>

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Update the server IP in `AppConfig.js` to be absolute rather than
      localhost
    * Run Genymotion or the standard Android simulator
    * run `react-native run-android`

## Running in development (web)

You'll need two components:

1. A HTTP server serving `App/Web/public`
2. Gulp watching and rebuilding the React Javascript

This can be achieved with a terminal running each of:

1. `cd App/Web/public && python -m SimpleHTTPServer 8000`
2. `gulp watch`
