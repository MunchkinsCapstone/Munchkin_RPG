import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import socket from '../socket'
import {createUserName} from '../store/userReducer'
import {joinRoom} from '../store/roomReducer'

class Room extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newUser = evt.target.newUser.value
    this.props.addPlayer(newUser)
    socket.emit('new player', newUser)
  }

  handleChange(evt) {
    evt.preventDefault()
    const newUser = evt.target.value
    this.setState({user: newUser})
  }

  componentDidMount() {
    socket.on('initialRoom', rooms => {
      this.props.addUserToRoom(rooms)
    })

    socket.on('room updated', room => {
      this.props.addUserToRoom(room)
    })
  }

  render() {
    const {room} = this.props
    console.log(this.props.room, 'PROPS_____________')
    return (
      <div>
        <h1>GAMEROOM</h1>
        {/* <div>{room.map((user, idx) => <li key={idx}>{user}</li>)}</div> */}
        <li>{this.props.room[0]}</li>
        <div>
          <div />
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="newUser">ADD USER</label>
                <input
                  type="text"
                  name="newUser"
                  value={this.props.newUser}
                  onChange={this.handleChange}
                />
              </div>
              <button>START GAME</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    room: state.room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: user => {
      dispatch(createUserName(user))
    },
    addUserToRoom: room => {
      dispatch(joinRoom(room))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Room))
