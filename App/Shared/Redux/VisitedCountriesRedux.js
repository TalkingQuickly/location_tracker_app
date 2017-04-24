import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  visitedCountriesRequest: null,
  visitedCountriesSuccess: ['countries'],
  visitedCountriesFailure: null
})

export const VisitedCountriesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  visitedCountries: [],
  fetching: false
})

export const countriesRequest = (state: Object) => {
  return state.merge({
    fetching: true
  })
}

export const countriesSuccess = (state: Object, {countries}) => {
  return state.merge({
    fetching: false,
    visitedCountries: countries
  })
}

export const countriesFailure = (state: Object) => {
  return state.merge({
    fetching: false
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VISITED_COUNTRIES_REQUEST]: countriesRequest,
  [Types.VISITED_COUNTRIES_SUCCESS]: countriesSuccess,
  [Types.VISITED_COUNTRIES_FAILURE]: countriesFailure
})
