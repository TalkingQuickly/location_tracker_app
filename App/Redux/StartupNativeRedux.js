// @flow

import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startupNative: ['callbacks']
})

export const StartupNativeTypes = Types
export default Creators
