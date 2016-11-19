import { call, put } from 'redux-saga/effects'

export function * getVisitedCities(api) {
  const response = yield call(api.getVisitedCities)

  if (response.ok) {
    console.log(response)
  } else {
    console.log("failed")
  }
}
