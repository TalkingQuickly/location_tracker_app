// import dependancies
import {createStore, applyMiddleware} from 'redux'
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

import { ENV } from '../env.js'


// import internal dependencies
/*import pollReducer from '../Redux'
import LoginActions from '../Redux/LoginRedux'
import PollsShowActions from '../Redux/PollsShowRedux'

// import components
import Base from '../Components/Base/Base'
import ShowPoll from '../Components/ShowPoll/ShowPoll'
import Login from '../Components/Login/Login'
*/

console.log("let's do this now!")

// import sagas
import rootSaga from '../../Sagas'

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [
  promiseMiddleware(),
  sagaMiddleWare,
  reduxThunk
]

if (ENV === 'development')
  console.log("In development environment")
  middlewares.push(reduxLogger())

// create single store
let store = createStore(pollReducer,
  applyMiddleware(...middlewares)
)

let history = syncHistoryWithStore(browserHistory, store)
sagaMiddleWare.run(rootSaga)

//store.dispatch(LoginActions.setToken(cookie.load('token')))

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Base}>
        <Route path="polls/:pollId" component={ShowPoll} requireLogin={true}/>
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-base'))
