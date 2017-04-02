import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { StartupNativeTypes} from '../Redux/StartupNativeRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { LocationHistoryTypes } from '../Redux/LocationHistoryRedux'
import { LocationHistoryMapTypes } from '../Redux/LocationHistoryMapRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { startupNative } from './StartupNativeSagas'
import { login, logout } from './LoginSagas'
import { getTemperature } from './TemperatureSagas'
import { getVisitedCities } from './LocationHistorySagas'
import { getRecentLocations } from './LocationHistoryMapSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(StartupNativeTypes.STARTUP_NATIVE, startupNative, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),

    // some sagas receive extra parameters in addition to an action
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api),
    takeLatest(LocationHistoryTypes.VISITED_CITIES_REQUEST, getVisitedCities, api),
    takeLatest(LocationHistoryMapTypes.RECENT_LOCATIONS_REQUEST, getRecentLocations, api)
  ]
}
