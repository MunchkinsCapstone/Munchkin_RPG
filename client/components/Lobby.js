import React, {Component} from 'react'
import socket from '../socket'

class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      //   room: {
      //     users: [],
      //     status: false,
      //     name: '',
      //     max: 4
      //   },
      newRoom: '',
      allRooms: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newRoom = evt.target.newRoom.value
    this.setState({newRoom: ''})
    this.setState({numberOfRooms: [...this.state.numberOfRooms, newRoom]})
    const payload = this.state
    socket.emit('roomAdded', payload)
    console.log(this.state, 'inside of LobbyJS')
  }

  handleChange(evt) {
    evt.preventDefault()

    const roomToBe = evt.target.value
    this.setState({newRoom: roomToBe})
  }

  render() {
    const {allRooms} = this.state
    return (
      <div>
        <h1>Welcome to the Lobby</h1>
        <div>
          <div>
            {allRooms.length ? (
              <div>
                <ul>
                  {allRooms.map((room, idx) => (
                    <li key={idx}>
                      {room} : Number of Players {room.length}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h1>No Rooms Create a Room to Play</h1>
              </div>
            )}
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="newRoom">Create Room</label>
                <input
                  type="text"
                  name="newRoom"
                  value={this.state.newRoom}
                  onChange={this.handleChange}
                />
              </div>
              <button>Create Room</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Lobby
