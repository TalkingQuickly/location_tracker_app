import { takeLatest } from 'redux-saga'
import API from '../../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../../Redux/StartupRedux'
import { LoginTypes } from '../../Redux/LoginRedux'
import { LocationHistoryTypes } from '../../Redux/LocationHistoryRedux'
import { LocationHistoryMapTypes } from '../../Redux/LocationHistoryMapRedux'

/* ------------- Sagas ------------- */

import { startup } from '../../Sagas/StartupSagas'
import { login, logout } from '../../Sagas/LoginSagas'
import { getVisitedCities } from '../../Sagas/LocationHistorySagas'
import { getRecentLocations } from '../../Sagas/LocationHistoryMapSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LocationHistoryTypes.VISITED_CITIES_REQUEST, getVisitedCities, api),
    takeLatest(LocationHistoryMapTypes.RECENT_LOCATIONS_REQUEST, getRecentLocations, api)
  ]
}
