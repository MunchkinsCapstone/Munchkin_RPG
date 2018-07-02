// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {withRouter, Route, Switch} from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { HomePage, Lobby, GameBoard, PlayerCard} from './components'
// import {me} from './store'

// /**
//  * COMPONENT
//  */
// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData()
//   }

//   render() {
//     return (
//       <Switch>
//         <Route component={Login} /> */}
//       </Switch>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }

import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom' // withRouter
import {Room, HomePage, GameBoard} from './components'

class Routes extends Component {
  render() {
    // return <h1>hello from routes</h1>;
    return (
      <Switch>
        <Route exact path="/lobby" component={Room} />
        <Route exact path="/game" component={GameBoard} />
        <Route component={HomePage} />
      </Switch>
    )
  }
}

export default Routes
