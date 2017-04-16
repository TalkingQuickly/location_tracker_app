// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'


export default (callbacks) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('../../Redux/LoginRedux').reducer,
    visitedCountries: require('../../Redux/VisitedCountriesRedux').reducer,
    locationHistoryMap: require('../../Redux/LocationHistoryMapRedux').reducer,
    routing: routerReducer,
    startup: require('./StartupRedux').reducer,
    form: formReducer
  })

  return configureStore(rootReducer, rootSaga, callbacks)
}
