//SERVER SOCKET
let rooms = [];


module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    io.emit('initialRoom', rooms)
    socket.on('roomMade', (payload) => {
      console.log('we got here ')
      console.log('socket received this payload', payload)
      rooms.push(payload.newRoom)
      console.log('rooms in server', rooms)
      io.sockets.emit('get rooms', rooms)
      // console.log('payload', payload)
      // socket.broadcast.emit('roomAdded', payload)
      // console.log('payload', payload.numberOfRooms)
    })

    // function updateRooms() {
    //   io.sockets.emit('get rooms', rooms)
    // }

    // socket.on('button2', str => {
    //   socket.broadcast.emit('button2', str)
    // })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}