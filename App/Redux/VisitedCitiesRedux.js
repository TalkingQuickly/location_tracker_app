import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  visitedCitiesRequest: null,
  visitedCitiesSuccess: ['cities'],
  visitedCitiesFailure: null
})

export const VisitedCitiesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  visitedCities: [],
  fetching: false
})

export const citiesRequest = (state: Object) => {
  return state.merge({
    fetching: true
  })
}

export const citiesSuccess = (state: Object, {cities}) => {
  return state.merge({
    fetching: false,
    visitedCities: cities
  })
}

export const citiesFailure = (state: Object) => {
  return state.merge({
    fetching: false
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VISITED_CITIES_REQUEST]: citiesRequest,
  [Types.VISITED_CITIES_SUCCESS]: citiesSuccess,
  [Types.VISITED_CITIES_FAILURE]: citiesFailure
})
