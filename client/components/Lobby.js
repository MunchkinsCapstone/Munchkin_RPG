import React, { Component } from 'react'
import socket from '../socket'
import { connect } from 'react-redux'
import { receiveUser } from '../store/userReducer'
import { Link } from 'react-router-dom'
import ChatLog from './ChatLog'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check: false,
      user: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  generateId() {
    let singleRand = () => Math.floor(Math.random() * 10);
    let digits = [];

    for (let i = 0; i < 9; i++) {
      let random = singleRand();
      digits.push(random);
    }
    return digits.join('');
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newUser = evt.target.newUser.value

    let currentUser = {
      id: this.generateId(),
      name: newUser
    }
    socket.emit('create new user', currentUser)

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    socket.on('received user', userArr => {
      localStorage.setItem('allUsers', JSON.stringify(userArr));
    })
    this.setState(prevState => (
      { check: !prevState.check, user: currentUser.name }
    ))
    console.log('submit', this.state)
  }


  handleChange(evt) {
    evt.preventDefault()
    const roomToBe = evt.target.value
    this.setState({ newUser: roomToBe })
  }


  render() {
    let liveArr = JSON.parse(localStorage.getItem('allUsers'))
    console.log('liveArr', liveArr)
    console.log('state', this.state)
    const currUser = JSON.parse(localStorage.getItem('currentUser'))
    // console.log('livearr length', liveArr.length)
    return (
      <div>
        <h1 id="title">Welcome to MUNCHKIN</h1>
        <div>
          {(() => {
            if (liveArr === null) {
              return <div>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label className='lobbyButton' htmlFor="newUser">Create User </label>
                    <input
                      type="text"
                      name="newUser"
                      value={this.state.newUser}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button>Enter the Dungeon</button>
                </form>
              </div>
            }
            if (liveArr.length === 4) {
              return <span>
                {liveArr.map((user, idx) => {
                  return <div>
                    <li key={idx}>{user.name}</li>
                  </div>
                })}
                <Link to="/">START GAME</Link>
              </span>
            }
            if (liveArr.length < 3) {
              return <div>
                <h2 className="intro">welcome {currUser.name}</h2>
                <p>...waiting for more players</p>
                {liveArr.map((user, idx) => {
                  return <div>
                    <li key={idx}>{user.name}</li>
                  </div>
                })}
              </div>
            }
          })()}
        </div>

        {/* <div>
          {!this.state.check ?
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label className='lobbyButton' htmlFor="newUser">Create User </label>
                  <input
                    type="text"
                    name="newUser"
                    value={this.state.newUser}
                    onChange={this.handleChange}
                  />
                </div>
                <button>Enter the Dungeon</button>
              </form>
            </div> : <div>
              <h2 className="intro">welcome {this.state.user}</h2>
              {liveArr.length < 4 ? liveArr.map((user, idx) => {
                return <div>
                  <li key={idx}>{user.name}</li>
                </div>
              }) : <div>
                  {liveArr.map((user, idx) => {
                    return <div>
                      <li key={idx}>{user.name}</li>
                    </div>
                  })}
                  <Link to="/">START GAME</Link>
                </div>}
            </div>}
        </div>} */}
        {/* <Link to="/">START GAME</Link> */}
        <ChatLog />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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