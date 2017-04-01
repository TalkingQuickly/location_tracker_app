// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import config from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = 'http://api.openweathermap.org/data/2.5/') => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: config.baseUrl,

    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getCity = (city) => api.get('weather', {q: city})
  //

  // Setting up users and sessions
  const signup = (email, password, password_confirmation) => api.post(
    'users',
    {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }
  )

  const login = (email, password, remember) => api.post(
    'users/sign_in',
    {
      user: {
        email: email,
        password: password,
        remember: remember
      }
    }
  )

  const logout = () => api.delete(
    'users/sign_out'
  )

  // Location information
  const getVisitedCities = () => api.get('visited_cities')
  const getRecentLocations = () => api.get('locations')

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    signup,
    login,
    logout,
    getCity,
    getVisitedCities,
    getRecentLocations
  }
}

// let's return back our create method as the default.
export default {
  create,
}
