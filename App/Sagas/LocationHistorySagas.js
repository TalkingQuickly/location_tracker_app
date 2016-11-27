import { call, put } from 'redux-saga/effects'
import LocationHistoryActions from '../Redux/LocationHistoryRedux'

export function * getVisitedCities(api) {
  const response = yield call(api.getVisitedCities)
  if (response.ok) {
    yield put(LocationHistoryActions.visitedCitiesSuccess(response.data.data))
  } else {
    console.log("failed")
  }
}
