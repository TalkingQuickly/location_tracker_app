// @flow

export default {
  // Functions return fixtures
  getCity: (city: string) => {
    // This fixture only supports Boise or else returns toronto
    const boiseData = require('../Fixtures/boise.json')
    const torontoData = require('../Fixtures/toronto.json')
    return {
      ok: true,
      data: city.toLowerCase() === 'boise' ? boiseData : torontoData
    }
  },

  login: (email: String, password: String) => {
    if (password === "password") {
      return {
        ok: true,
        data: {
          token: "avalidapitoken"
        }
      }
    } else {
      return {
        ok: false
      }
    }
  }
}
