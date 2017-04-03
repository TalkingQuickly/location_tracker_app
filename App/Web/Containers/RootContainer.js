import React, {Component} from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Placeholder from '../Components/Placeholder'
import Login from './Login.js'
import {connect} from 'react-redux'

class RootContainer extends Component {

  checkAuth(nextState, replace) {
    return (nextState, replace) => {
      if (this.props.login.token === null) {
        replace({
          pathname: '/login'
        })
      }
    }
  }

  render () {
    // don't render routes until we've rehydrated the store
    if (this.props.startup.ready !== true) {
      return(<div>Loading...</div>)
    }
    // once we have the store rehydrated, then render the actual router
    return(
      <Router history={browserHistory}>
        <Route path="/" component={Placeholder} onEnter={this.checkAuth()} />
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  //startup: () => dispatch(StartupActions.startup()),
  //startupNative: () => dispatch(StartupNativeActions.startupNative())
})

const mapStateToProps = (state) => {
  return {
    login: state.login,
    startup: state.startup
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
