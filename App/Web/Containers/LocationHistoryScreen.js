import React, {Component} from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import LocationHistoryActions from '../../Redux/LocationHistoryRedux'

class LocationHistoryScreen extends Component {

  componentDidMount() {
    // update the list of countries
    this.props.requestLocationHistory()
  }

  render () {
    const { visitedCities } = this.props.locationHistory
    return(
      <div>
        <h2>
          Countries
        </h2>
        <ul>
        {visitedCities.map(function(city, i) {
          return(
            <li key={i}>{city.name}</li>
          )
        })}

        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLocationHistory: () => dispatch(LocationHistoryActions.visitedCitiesRequest())
  }
}

const mapStateToProps = (state) => {
  return {
    locationHistory: state.locationHistory
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHistoryScreen)
