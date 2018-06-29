import React, {Component} from 'react'
import socket from '../socket'

class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      room: {
        users: [],
        status: false,
        name: '',
        max: 4
      },
      newRoom: '',
      numberOfRooms: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // console.log(evt.target.newRoom.value)
    const newRoom = evt.target.newRoom.value
    console.log(newRoom, 'we got here')

    // this.setState({numberOfRoom: [...numberOfRoom, ]})
  }

  handleChange(evt) {
    evt.preventDefault()

    const roomToBe = evt.target.value
    this.setState({newRoom: roomToBe})
    // console.log(this.state.newRoom)
  }

  render() {
    // const { users, status } = this.state;
    const {room, numberOfRooms} = this.state
    return (
      <div>
        <h1>Welcome to the Lobby</h1>
        <div>
          <div>
            {numberOfRooms.length ? (
              <div>
                <ul>
                  {numberOfRooms.map(room => (
                    <li>
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
