import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { email , password }) {
  const response = yield call(api.login, email, password)
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.token))
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
