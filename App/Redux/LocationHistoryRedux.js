import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  visitedCitiesRequest: null,
  visitedCitiesSuccess: ['cities']
})

export const LocationHistoryTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  visitedCities: [],
  fetching: false
})

export const request = (state: Object) => {
  console.log("112233")
  return state.merge({
    fetching: true
  })
}

export const success = (state: Object, {cities}) => {
  return state.merge({
    fetching: false,
    visitedCities: cities
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VISITED_CITIES_REQUEST]: request,
  [Types.VISITED_CITIES_SUCCESS]: success
})
