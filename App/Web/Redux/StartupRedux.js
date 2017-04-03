// @flow

import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null
})

export const StartupTypes = Types

export const INITIAL_STATE = Immutable({
  ready: false
})

export const startup = (state) => state.merge({ready: true})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup
})

export default Creators
