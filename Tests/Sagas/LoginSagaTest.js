import test from 'ava'
import { put, call } from 'redux-saga/effects'
import { login } from '../../App/Sagas/LoginSagas'
import LoginActions from '../../App/Redux/LoginRedux'
import FixtureAPI from '../../App/Services/FixtureApi'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', (t) => {
  const validLogin = {email: 'something', password: 'password'}
  const step = stepper(login(FixtureAPI, validLogin))
  t.deepEqual(
    step(),
    call(FixtureAPI.login, 'something', 'password')
  )
})

test('success path - stores API token', (t) => {
  const validLogin = {email: 'something', password: 'password'}
  const response = FixtureAPI.login("something", "password")
  const step = stepper(login(FixtureAPI, validLogin))

  step()
  t.deepEqual(
    step(response),
    put(LoginActions.loginSuccess(response.data.token))
  )
})

test('success path - calls success callback', (t) => {
  let i = 0;
  const onSuccess = () => {
    i++
  }
  const validLogin = {
    email: 'something',
    password: 'password',
    onSuccess: onSuccess
  }
  const response = FixtureAPI.login("something", "password")
  const step = stepper(login(FixtureAPI, validLogin))

  step()
  step(response)

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
