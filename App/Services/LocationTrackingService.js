import BackgroundGeolocation from 'react-native-mauron85-background-geolocation'
import config from '../Config/AppConfig'

const setupLocationTracking = (token) => {
  const { baseUrl } = config
  BackgroundGeolocation.configure({
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 1,
    locationTimeout: 30,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: true,
    startOnBoot: true,
    stopOnTerminate: false,
    locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
    interval: 1000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
    stopOnStillActivity: false,
    syncUrl: `${baseUrl}locations?token=${token}`,
    syncThreshold: 1
  })
}

export default setupLocationTracking
