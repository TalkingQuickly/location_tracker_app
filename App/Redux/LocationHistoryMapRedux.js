import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  recentLocationsRequest: null,
  recentLocationsSuccess: ['recentLocations']
})

export const LocationHistoryMapTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  recentLocations: [],
  fetching: false
})

export const request = (state: Object) => {
  return state.merge({
    fetching: true
  })
}

export const success = (state: Object, {recentLocations}) => {
  return state.merge({
    fetching: false,
    recentLocations: recentLocations
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECENT_LOCATIONS_REQUEST]: request,
  [Types.RECENT_LOCATIONS_SUCCESS]: success
})
