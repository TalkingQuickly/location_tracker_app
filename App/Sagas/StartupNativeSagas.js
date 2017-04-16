import { call, select } from 'redux-saga/effects'
import { is } from 'ramda'
import setupLocationTracking from '../Services/LocationTrackingService'

// exported to make available for tests
export const selectToken = (state) => state.login.token

export function * startupNative (api, { callbacks } ) {
  const token = yield select(selectToken)
  if (token === null) {
    yield call(callbacks.onLoggedOut)
  } else {
    yield call(api.setAuthToken, token)
    yield call(callbacks.onLoggedIn())
    yield call(setupLocationTracking, token)
  }
}
