import React, {Component} from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {connect} from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'

//Individual Screens
import LoginScreen from './LoginScreen.js'
import PlaceholderScreen from '../Containers/PlaceholderScreen'
import LocationHistoryScreen from '../Containers/LocationHistoryScreen'

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

  handleLogout() {
    return () =>
      this.props.handleLogout(this.onLogoutSuccess())
  }

  handleOnClickCountries() {
    browserHistory.push('/countries')
  }

  onLogoutSuccess() {
    return() =>
      browserHistory.push('/login')
  }

  render () {
    // don't render routes until we've rehydrated the store
    if (this.props.startup.ready !== true) {
      return(<div>Loading...</div>)
    }
		const { token } = this.props.login
    return(
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">	
						<ul className="nav navbar-nav">
								<li className=""><a href="#">Home</a></li>
								<li className=""><a onClick={this.handleOnClickCountries}>Countries</a></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
              { token &&
							<li className=""><a onClick={this.handleLogout()}>Logout</a></li>
              }
						</ul>
					</div>
				</nav>
				<Router history={browserHistory}>
					<Route path="/" component={PlaceholderScreen} onEnter={this.checkAuth()} />
					<Route path="/countries" component={LocationHistoryScreen} onEnter={this.checkAuth()} />
					<Route path="/login" component={LoginScreen} />
				</Router>
			</div>
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
	handleLogout: (onLogout) => dispatch(LoginActions.logout(onLogout))
})

const mapStateToProps = (state) => {
  return {
    login: state.login,
    startup: state.startup
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
