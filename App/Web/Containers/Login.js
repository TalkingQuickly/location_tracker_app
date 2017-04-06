import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import LoginForm from '../Components/Login/LoginForm'

class Login extends Component {

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
      console.log("We logged in baby")
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
    loginRequest: (email, password, onSuccess) => dispatch(LoginActions.loginRequest(email, password, onSuccess)),
    redirect: () => dispatch(push('/sadfasfasfa'))
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
