import ReduxPersist from '../Config/ReduxPersist'
import localForage from 'localForage'
import { persistStore } from 'redux-persist'

const updateReducers = (store: Object, startupCallback) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  const startup = () => store.dispatch(startupCallback)

  // Check to ensure latest reducer version
  localForage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      console.tron.display({
        name: 'PURGE',
        value: {
          'Old Version:': localVersion,
          'New Version:': reducerVersion
        },
        preview: 'Reducer Version Change Detected',
        important: true
      })
      // Purge store
      persistStore(store, config, startup).purge()
      localForage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config, startup)
    }
  }).catch(() => {
    persistStore(store, config, startup)
    localForage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}
