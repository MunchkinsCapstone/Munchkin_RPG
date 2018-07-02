import React, {Component} from 'react'
import Login from './Login'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const REACT_APP_FIREBASE_API_KEY = 'AIzaSyAG8y7eEX8XaW5xZZbZm9QGmSvrpRnpVHg'

const FIREBASE_API_KEY = REACT_APP_FIREBASE_API_KEY
console.log('key', FIREBASE_API_KEY)

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: 'munchkin-auth.firebaseapp.com'
})

class HomePage extends Component {
  constructor() {
    super()
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
      console.log('user', user)
      this.setState({isSignedin: !!user})
      console.log('user after setState<><><><><><>', user)
      //deleted userName props in setState
    })
  }
  render() {
    return (
      <div className="App">
        <h1>MUNCHKIN</h1>
        <Login />
        {this.state.isSignedin ? (
          <span>
            <div>You are logged in!</div>
            <h1>WELCOME {firebase.auth().currentUser.displayName}</h1>
            <Link to="/lobby">HEAD TO LOBBY</Link>
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

export default HomePage
