import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import R from 'ramda'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'

// creates the store
export default (rootReducer, rootSaga, startupCallback) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store, startupCallback)
  }

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
