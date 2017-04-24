import { takeLatest } from 'redux-saga'
import API from '../../Shared/Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../../Shared/Redux/StartupRedux'
import { LoginTypes } from '../../Shared/Redux/LoginRedux'
import { VisitedCountriesTypes } from '../../Shared/Redux/VisitedCountriesRedux'
import { LocationHistoryMapTypes } from '../../Shared/Redux/LocationHistoryMapRedux'

/* ------------- Sagas ------------- */

import { startup } from '../../Shared/Sagas/StartupSagas'
import { login, logout } from '../../Shared/Sagas/LoginSagas'
import { getVisitedCountries } from '../../Shared/Sagas/VisitedCountriesSagas'
import { getRecentLocations } from '../../Shared/Sagas/LocationHistoryMapSagas'

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
