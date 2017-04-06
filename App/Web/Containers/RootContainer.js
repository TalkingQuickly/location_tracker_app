import React, {Component} from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Placeholder from '../Components/Placeholder'
import Login from './Login.js'
import {connect} from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'

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
								<li className="active"><a href="#">Home</a></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
              { token &&
							<li className=""><a onClick={this.handleLogout()}>Logout</a></li>
              }
						</ul>
					</div>
				</nav>
				<Router history={browserHistory}>
					<Route path="/" component={Placeholder} onEnter={this.checkAuth()} />
					<Route path="/login" component={Login} />
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
