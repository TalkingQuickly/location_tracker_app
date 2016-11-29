import { call, put } from 'redux-saga/effects'
import LocationHistoryMapActions from '../Redux/LocationHistoryMapRedux'

export function * getRecentLocations(api) {
  console.log("get recent locations")
  const response = yield call(api.getRecentLocations)
  if (response.ok) {
    yield put(LocationHistoryMapActions.recentLocationsSuccess(response.data.data))
  } else {
    console.log("failed")
  }
}
