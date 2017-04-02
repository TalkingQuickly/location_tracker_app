import { call, select } from 'redux-saga/effects'
import { is } from 'ramda'

// exported to make available for tests
export const selectToken = (state) => state.login.token


// process STARTUP actions
export function * startup (api) {
  const token = yield select(selectToken)
  yield call(api.setAuthToken, token)
}
