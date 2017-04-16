import { call, put } from 'redux-saga/effects'
import VisitedCountriesActions from '../Redux/VisitedCountriesRedux'

export function * getVisitedCountries(api) {
  const response = yield call(api.getVisitedCountries)
  if (response.ok) {
    yield put(VisitedCountriesActions.visitedCountriesSuccess(response.data.data))
  } else {
    yield put(VisitedCountriesActions.visitedCountriesFailure())
  }
}
