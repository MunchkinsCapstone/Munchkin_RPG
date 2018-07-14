import React, { Component } from 'react'
import socket from '../socket'
import { connect } from 'react-redux'
import { receiveUser } from '../store/userReducer'
import { Link } from 'react-router-dom'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: '',
      // allUsers: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }



  handleSubmit(evt) {
    evt.preventDefault()
    const newUser = evt.target.newUser.value
    // this.props.getUser(newUser)
    // this.setState({ newUser: newUser, allUsers: [newUser] })
    console.log('payload after state', this.state.newUser)
    // this.props.getUser(newUser);
    // localStorage.setItem('name', newUser)
    // console.log('storage', localStorage)
    socket.emit('create new user', newUser)
    socket.on('received user', userArr => {
      localStorage.setItem('allUsers', JSON.stringify(userArr));
    })
    let liveArr = JSON.parse(localStorage.getItem('allUsers'))
    console.log(liveArr)

    // localStorage.setItem(newUser, 'value')
    // socket.emit('roomMade', payload)
    // socket.on('get user', data => {
    //   console.log('user received from server socket', data)
    //   this.setState({ allUsers: data })
    //   console.log('after setting state..', this.state)
    // })
    console.log('props in submit', this.props)
  }

  componentDidMount() {
    console.log('didmount', this.props.user)
  }

  componentWillMount() {
    console.log('willmount', this.props.user)
  }

  handleChange(evt) {
    evt.preventDefault()

    const roomToBe = evt.target.value
    this.setState({ newUser: roomToBe })
  }

  // componentDidMount() {
  //   // console.log('before mount state', this.state)
  //   // socket.on('get user', (user) => {
  //   //   this.setState({ allUsers: user })
  //   // })
  //   socket.on('initalRoom', (user) => {
  //     this.setState({ allUsers: user })
  //   })
  //   // this.setState({ allUsers: ['ray', 'ed', 'jean'] })
  //   // console.log('after state in mount', this.state)
  // }


  render() {
    const { allUsers } = this.state
    console.log('props', this.props)
    return (
      <div>
        <h1>Welcome to the Lobby</h1>

        <div>
          {this.props.user ? <p>yes</p> : <p>no</p>}
        </div>
        <div>
          <div>
            {/* {allUsers.length ? (
              <div>
                <ul>
                  {allUsers.map((user, idx) => (
                    <li key={idx}>
                      user NAME: {user}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
                <div>
                  <h1>No user Create a user to Play</h1>
                </div>
              )} */}
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="newUser">Create user</label>
                <input
                  type="text"
                  name="newUser"
                  value={this.state.newUser}
                  onChange={this.handleChange}
                />
              </div>
              <button>Create user</button>
            </form>
          </div>
        </div>
        <Link to="/">START GAME</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    user: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: user => {
      console.log('user in mapdispatch', user)
      dispatch(receiveUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)