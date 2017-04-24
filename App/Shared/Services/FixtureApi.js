// @flow

export default {

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
