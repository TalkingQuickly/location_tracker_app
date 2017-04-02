// import dependancies
import { applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import createSagaMiddleware from 'redux-saga'
import React from 'react'
import ReactDOM from 'react-dom'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import Api from '../../Services/Api'
import cookie from 'react-cookie'
import StartupActions from '../Redux/StartupRedux'
import { ENV } from '../env.js'
import Base from '../Components/Placeholder'
import { combineReducers } from 'redux'
import configureStore from '../Redux/CreateStore'
import createStore from '../Redux'

const callbacks = {
  onLoggedIn: () => {},
  onLoggedOut: () => {}
}

//create the store
const store = createStore(StartupActions.startup(callbacks))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Base}>
        <Route path="polls/:pollId" component={Base} />
        <Route path="login" component={Base} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-base'))
