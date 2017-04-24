import { call, select } from 'redux-saga/effects'

// exported to make available for tests
export const selectToken = (state) => state.login.token


// process STARTUP actions
export function * startup (api) {
  const token = yield select(selectToken)
  yield call(api.setAuthToken, token)
}
