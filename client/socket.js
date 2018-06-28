import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('button One', () => {
    console.log('WE connected')
  })

  socket.on('button2', str => {
    console.log('here is that string', str)
  })
})

export default socket
