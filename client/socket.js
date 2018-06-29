import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('roomAdded', payload => {
    console.log('WE connected', payload)
  })

  socket.on('button2', str => {
    console.log('here is that string', str)
  })
})

export default socket
