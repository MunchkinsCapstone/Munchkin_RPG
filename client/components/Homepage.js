import React, { Component } from 'react'
import Login from './Login'
import Lobby from './Lobby'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
// console.log('key', FIREBASE_API_KEY)

firebase.initializeApp({
  apiKey: 'AIzaSyAG8y7eEX8XaW5xZZbZm9QGmSvrpRnpVHg',
  authDomain: 'munchkin-auth.firebaseapp.com'
})

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isSignedin: false,
      currentUser: {},
      random: 'das'
    }
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => false
      }
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedin: !!user, currentUser: user.email })
      //deleted userName props in setState
      // console.log('user', user.displayName);
    })
  }
  render() {
    console.log('render state', this.state)
    return (
      <div className="App">
        <h1>MUNCHKIN</h1>
        {/* <Login /> */}
        {this.state.isSignedin ? (
          <span>
            <div>You are logged in!</div>
            <h1>WELCOME {firebase.auth().currentUser.displayName}</h1>
            {/* <h1>Welcome: {this.state.userName}</h1> */}
            <Link to="/lobby">HEAD TO LOBBY</Link>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        {/* <Lobby user={this.state.random} /> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('statemap', state)
  console.log('toMap', state.currentUser)
  return {
    userName: state.currentUser
  }
}


export default withRouter(connect(mapStateToProps, null)(HomePage))
