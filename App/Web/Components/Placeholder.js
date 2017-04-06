import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import { browserHistory } from 'react-router'

class Placeholder extends Component {
  onLogout() {
    return () =>
      this.props.handleLogout(this.onLogoutSuccess())
  }

  onLogoutSuccess() {
    return() =>
      browserHistory.push('/login')
  }

  render () {
    return(
      <div>
        Hello World
        <br/>
        <a onClick={this.onLogout()}>Logout</a>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: (onLogout) => dispatch(LoginActions.logout(onLogout))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder)
