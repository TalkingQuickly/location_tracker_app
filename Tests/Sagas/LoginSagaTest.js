import test from 'ava'
import { put, call } from 'redux-saga/effects'
import { login } from '../../App/Shared/Sagas/LoginSagas'
import LoginActions from '../../App/Shared/Redux/LoginRedux'
import FixtureAPI from '../../App/Shared/Services/FixtureApi'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', (t) => {
  const validLogin = {email: 'something', password: 'password'}
  const step = stepper(login(FixtureAPI, validLogin))
  t.deepEqual(
    step(),
    call(FixtureAPI.login, 'something', 'password')
  )
})

test('success path' , (t) => {
  const onSuccess = () =>
    "it works"

  const validLogin = {
    email: 'something',
    password: 'password',
    onSuccess: onSuccess
  }

  const response = FixtureAPI.login("something", "password")
  const step = stepper(login(FixtureAPI, validLogin))

  step()

  t.deepEqual(
    step(response),
    put(LoginActions.loginSuccess(response.data.token))
  )

  t.deepEqual(
    step(),
    call(FixtureAPI.setAuthToken, response.data.token)
  )

  t.deepEqual(
    step(),
    call(onSuccess)
  )
})

test('failure path', (t) => {
  const invalidLogin = {email: 'something', password: 'wrongpassword'}
  const response = FixtureAPI.login("something", "wrongpassword")
  const step = stepper(login(FixtureAPI, invalidLogin))
  step()

  t.deepEqual(step(response), put(LoginActions.loginFailure('WRONG')))
})
