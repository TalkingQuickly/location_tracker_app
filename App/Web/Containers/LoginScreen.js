import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import LoginForm from '../Components/Login/LoginForm'
import { browserHistory } from 'react-router'

class LoginScreen extends Component {

  handleSubmit(form) {
    return (form) => {
      this.props.loginRequest(
        form.email,
        form.password,
        this.handleLoginSuccess()
      )
    }
  }

  handleLoginSuccess() {
    return () => {
      browserHistory.push('/countries')
    }
  }

  render() {
    return(
      <div>
        <LoginForm onSubmit={this.handleSubmit()} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (email, password, onSuccess) => dispatch(LoginActions.loginRequest(email, password, onSuccess))
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
