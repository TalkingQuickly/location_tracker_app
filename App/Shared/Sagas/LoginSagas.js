import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { email , password , onSuccess}) {
  const response = yield call(api.login, email, password)
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.token))
    yield call(api.setAuthToken, response.data.token)
    yield call(onSuccess)
  } else {
    yield put(LoginActions.loginFailure('WRONG'))

  }
}

export function * logout({ onSuccess }) {
  yield call(onSuccess)
}
