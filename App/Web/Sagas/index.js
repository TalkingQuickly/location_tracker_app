import { takeLatest } from 'redux-saga'
import API from '../../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../../Redux/StartupRedux'
import { LoginTypes } from '../../Redux/LoginRedux'
import { VisitedCountriesTypes } from '../../Redux/VisitedCountriesRedux'
import { LocationHistoryMapTypes } from '../../Redux/LocationHistoryMapRedux'

/* ------------- Sagas ------------- */

import { startup } from '../../Sagas/StartupSagas'
import { login, logout } from '../../Sagas/LoginSagas'
import { getVisitedCountries } from '../../Sagas/VisitedCountriesSagas'
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
    takeLatest(VisitedCountriesTypes.VISITED_COUNTRIES_REQUEST, getVisitedCountries, api),
    takeLatest(LocationHistoryMapTypes.RECENT_LOCATIONS_REQUEST, getRecentLocations, api)
  ]
}
