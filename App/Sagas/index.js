import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { StartupNativeTypes} from '../Redux/StartupNativeRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { VisitedCitiesTypes } from '../Redux/VisitedCitiesRedux'
import { VisitedCountriesTypes } from '../Redux/VisitedCountriesRedux'
import { LocationHistoryMapTypes } from '../Redux/LocationHistoryMapRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { startupNative } from './StartupNativeSagas'
import { login, logout } from './LoginSagas'
import { getVisitedCities } from './VisitedCitiesSagas'
import { getVisitedCountries } from './VisitedCountriesSagas'
import { getRecentLocations } from './LocationHistoryMapSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(StartupNativeTypes.STARTUP_NATIVE, startupNative, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(VisitedCitiesTypes.VISITED_CITIES_REQUEST, getVisitedCities, api),
    takeLatest(VisitedCountriesTypes.VISITED_COUNTRIES_REQUEST, getVisitedCountries, api),
    takeLatest(LocationHistoryMapTypes.RECENT_LOCATIONS_REQUEST, getRecentLocations, api)
  ]
}
