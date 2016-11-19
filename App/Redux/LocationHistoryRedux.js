import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  visitedCitiesRequest: null
})

export const LocationHistoryTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  visited_cities: null
})

export const request = (state: Object) =>
  state.merge({
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VISITED_CITIES_REQUEST]: request
})
