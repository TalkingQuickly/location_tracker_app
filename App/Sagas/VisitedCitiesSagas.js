import { call, put } from 'redux-saga/effects'
import VisitedCityActions from '../Redux/VisitedCitiesRedux'

export function * getVisitedCities(api) {
  const response = yield call(api.getVisitedCities)
  if (response.ok) {
    yield put(VisitedCityActions.visitedCitiesSuccess(response.data.data))
  } else {
    yield put(VisitedCityActions.visitedCitiesFailure())
  }
}
