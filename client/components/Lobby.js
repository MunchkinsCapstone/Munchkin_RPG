import React, { Component } from 'react'
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
    // this.setState({ newRoom: '' })
    // console.log('newRoom', newRoom)
    // let listWithAddedRooms = this.state.allRooms.concat(newRoom)
    // console.log('listwithaddedrooms', listWithAddedRooms)
    // this.setState({ newRoom: '', allRooms: listWithAddedRooms })
    // console.log('afer state', this.state)
    this.setState({ newRoom: newRoom, allRooms: [newRoom] })
    const payload = this.state
    console.log('payload after state', this.state)
    socket.emit('roomMade', payload)
    socket.on('get rooms', data => {
      console.log('rooms received from server socket', data)
      this.setState({ allRooms: data })
      console.log('after setting state..', this.state)
    })
  }

  handleChange(evt) {
    evt.preventDefault()

    const roomToBe = evt.target.value
    this.setState({ newRoom: roomToBe })
  }

  componentDidMount() {
    // console.log('before mount state', this.state)
    // socket.on('get rooms', (rooms) => {
    //   this.setState({ allRooms: rooms })
    // })
    socket.on('initalRoom', (rooms) => {
      this.setState({ allRooms: rooms })
    })
    // this.setState({ allRooms: ['ray', 'ed', 'jean'] })
    // console.log('after state in mount', this.state)
  }


  render() {
    console.log('<><><><><><><><><><>><>>>><><><><><>')
    const { allRooms } = this.state
    console.log('render this.state', allRooms)
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
                      {console.log('allRooms map', allRooms)}
                      ROOM NAME: {room}
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