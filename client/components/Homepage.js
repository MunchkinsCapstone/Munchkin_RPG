import React, { Component } from 'react'
import Login from './Login'

import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import { receiveUser } from '../store/userReducer';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
console.log('key', FIREBASE_API_KEY)

firebase.initializeApp({
  apiKey: 'AIzaSyAG8y7eEX8XaW5xZZbZm9QGmSvrpRnpVHg',
  authDomain: 'munchkin-auth.firebaseapp.com'
})

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedin: false
      // userName: ''
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
      this.setState({ isSignedin: !!user })
      console.log('user', user.displayName)
      this.props.grabUser(user)
      //deleted userName props in setState
      // console.log('user', user.displayName);
    })
  }
  render() {
    console.log('props1', this.props)
    console.log('state', this.state)
    return (
      <div className="App">
        <h1>MUNCHKIN</h1>
        <Login />
        {this.state.isSignedin ? (
          <span>
            <div>You are logged in!</div>
            <h1>WELCOME {firebase.auth().currentUser.displayName}</h1>
            {/* <h1>Welcome: {this.state.userName}</h1> */}
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapState', state)
  return {
    users: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    grabUser: (userObj) => {
      dispatch(receiveUser(userObj))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
