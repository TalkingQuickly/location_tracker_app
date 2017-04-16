// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default (callbacks) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    locationHistoryMap: require('./LocationHistoryMapRedux').reducer,
    visitedCities: require('./VisitedCitiesRedux').reducer,
    visitedCountries: require('./VisitedCountriesRedux').reducer
  })

  return configureStore(rootReducer, rootSaga, callbacks)
}
