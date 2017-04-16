import React, {Component} from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import VisitedCountriesActions from '../../Redux/VisitedCountriesRedux'

class LocationHistoryScreen extends Component {

  componentDidMount() {
    // update the list of countries
    this.props.requestLocationHistory()
  }

  render () {
    const { visitedCountries } = this.props.visitedCountries
    return(
      <div>
        <h2>
          Countries
        </h2>
        <ul>
        {visitedCountries.map(function(country, i) {
          return(
            <li key={i}>{country.name}</li>
          )
        })}

        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLocationHistory: () => dispatch(VisitedCountriesActions.visitedCountriesRequest())
  }
}

const mapStateToProps = (state) => {
  return {
    visitedCountries: state.visitedCountries
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHistoryScreen)
