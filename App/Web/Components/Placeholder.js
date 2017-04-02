import React, {Component} from 'react'
import {connect} from 'react-redux'

class Base extends Component {
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

export default connect(mapStateToProps)(Base)
