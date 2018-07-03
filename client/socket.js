//CLIENT SIDE SOCKET

import io from 'socket.io-client'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
