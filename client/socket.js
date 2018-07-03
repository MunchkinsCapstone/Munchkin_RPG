//CLIENT SIDE SOCKET

import io from 'socket.io-client'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  // socket.on('get rooms', (rooms) => {
  //   console.log('hearing from socket client', rooms)
  // })

  socket.on('gameStarted', () => {})

  // socket.on('roomAdded', payload => {})

  // socket.on('button2', str => {
  //   console.log('here is that string', str)
  // })
})

export default socket
