// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { routerReducer } from 'react-router-redux'


export default (callbacks) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('../../Redux/LoginRedux').reducer,
    locationHistory: require('../../Redux/LocationHistoryRedux').reducer,
    locationHistoryMap: require('../../Redux/LocationHistoryMapRedux').reducer,
    routing: routerReducer
  })

  return configureStore(rootReducer, rootSaga, callbacks)
}
