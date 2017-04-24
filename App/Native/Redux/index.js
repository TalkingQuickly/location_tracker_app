// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default (callbacks) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('../../Shared/Redux/LoginRedux').reducer,
    locationHistoryMap: require('../../Shared/Redux/LocationHistoryMapRedux').reducer,
    visitedCities: require('../../Shared/Redux/VisitedCitiesRedux').reducer,
    visitedCountries: require('../../Shared/Redux/VisitedCountriesRedux').reducer
  })

  return configureStore(rootReducer, rootSaga, callbacks)
}
