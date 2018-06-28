import React, {Component} from 'react'
import socket from '../socket'

const dummyData = {
  users: ['ray', 'oz'],
  status: false,
  name: 'SocketRoom'
}

class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      room: {
        users: [],
        status: false,
        name: '',
        max: 4,
        newRoom: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.setState({[evt.target.name]: evt.target.value})
  }

  handleChange(evt) {
    console.log('typing')
    evt.preventDefault()
    // console.log('typing', evt.target)

    // this.setState({newRoom: evt.target.value})
    // console.log('-state-', this.state.newRoom)
  }

  render() {
    // const { users, status } = this.state;
    const {users, status, name} = dummyData
    return (
      <div>
        <h1>Welcome to the Lobby</h1>
        <div>
          {!status && (
            <div>
              <h2>{name}</h2>
              <ul>
                {users.map((user, idx) => (
                  <div>
                    <li key={idx}>{user}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}

          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Create Room</label>
                <input
                  //   value={this.state.room.name}
                  //   onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="roomName"
                  placeholder="Enter room name"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-default">
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Lobby
