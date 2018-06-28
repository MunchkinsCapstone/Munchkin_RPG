import React, {Component} from 'react'
import socket from '../socket'

class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      room: {}
    }
    this.handleTest.bind(this)
    this.handleTestingTwo.bind(this)
  }

  handleTest() {
    console.log('I got clicked')
    socket.emit('button One')
  }

  handleTestingTwo() {
    console.log('We connected the clicks')
    socket.emit('button2', 'dogs are cool')
  }
  render() {
    return (
      <div>
        <h1>Welcome to the Lobby</h1>
        <button onClick={this.handleTest}>Test for sockets 1</button>
        <div>
          <button onClick={this.handleTestingTwo}>Other Button</button>
        </div>
      </div>
    )
  }
}

export default Lobby
