// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight
  },
  outerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  innerColumn: {
    flexDirection: 'column'
  },
  countryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
    timeInCountry: {
    fontSize: 14,
  }
})
