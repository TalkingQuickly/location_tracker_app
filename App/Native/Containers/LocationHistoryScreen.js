// @flow

import React from 'react'
import { View, ListView, ScrollView, Text, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Actions
import VisitedCountriesActions from '../../Shared/Redux/VisitedCountriesRedux'

// Styles
import styles from './Styles/LocationHistoryScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class LocationHistoryScreen extends React.Component {
  constructor (props) {
    super(props)
    const countries= []
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(countries)
    }
  }

  componentWillMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.props.attemptGetRecentlyVisited()
  }

  _renderRow (rowData) {
    return (
      <View style={styles.outerRow}>
        <View style={styles.innerColumn}>
          <Text style={styles.countryHeading}>{rowData.name}</Text>
          <Text style={styles.timeInCountry}>{rowData.arrived} - {rowData.departed}</Text>
        </View>
        <Text style={styles.boldLabel}>({rowData.duration} days)</Text>
      </View>
    )
  }

  componentWillReceiveProps (newProps) {
    if (newProps.countries) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.countries)
      })
    }
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    const {fetching} = this.props
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        pageSize={15}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
      </ListView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.visitedCountries.fetching,
    countries: state.visitedCountries.visitedCountries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetRecentlyVisited: () => dispatch(VisitedCountriesActions.visitedCountriesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHistoryScreen)
