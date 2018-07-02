import React, {Component} from 'react'
import socket from '../socket'
import axios from 'axios'

class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      newRoom: '',
      allRooms: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // const newRoom = evt.target.newRoom.value
    let newRoomState = {
      name: '',
      players: []
    }
    newRoomState.name = evt.target.newRoom.value
    // Burning Question: How can we control whether to init players array/name or update existing room?

    // this.setState({ newRoom: '' })
    // console.log('newRoom', newRoom)
    // let listWithAddedRooms = this.state.allRooms.concat(newRoom)
    // console.log('listwithaddedrooms', listWithAddedRooms)
    // this.setState({ newRoom: '', allRooms: listWithAddedRooms })
    // console.log('afer state', this.state)
    // this.setState({newRoom: newRoom.name, allRooms: [newRoom]})
    const payload = newRoomState
    console.log('payload after state', payload)
    socket.emit('roomMade', payload)
    socket.on('get rooms', data => {
      console.log('rooms received from server socket', data)
      this.setState({newRoom: data})
      console.log('after setting state..', this.state)
    })
  }

  handleChange(evt) {
    evt.preventDefault()

    const roomToBe = evt.target.value
    this.setState({newRoom: roomToBe})
  }

  componentDidMount() {
    // console.log('before mount state', this.state)
    // socket.on('get rooms', (rooms) => {
    //   this.setState({ allRooms: rooms })
    // })
    // socket.on('initalRoom', rooms => {
    //   this.setState({allRooms: rooms})
    // })

    axios
      .get('/api/lobby')
      .then(res => res.data)
      .then(foundLobby => {
        this.setState({allRooms: foundLobby})
      })
      .catch(err => console.error('Not found'))
  }

  render() {
    console.log(this.state)
    const {allRooms} = this.state
    // console.log('render this.state', allRooms)
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
                      ROOM NAME: {room.name}
                      <ul>
                        players:{' '}
                        {room.players &&
                          room.plays.map(player => <li>{player}</li>)}
                      </ul>
                    </li>
                  ))}
                </ul>ß
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
              <button>Refresh Room</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Lobby
