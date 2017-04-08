import React, {Component} from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

class PlaceholderScreen extends Component {

  render () {
    return(
      <div>
        Hello World
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceholderScreen)
