
//SERVER SOCKET
module.exports = io => {
  let rooms = [];
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('roomMade', (payload) => {
      console.log('we got here ')
      // cb(true)
      socket.newRoom = payload.newRoom
      rooms.push(socket.newRoom)
      updateRooms()
      // console.log('payload', payload)
      // socket.broadcast.emit('roomAdded', payload)
      // console.log('payload', payload.numberOfRooms)
    })

    function updateRooms() {
      io.sockets.emit('get rooms', rooms)
    }

    // socket.on('button2', str => {
    //   socket.broadcast.emit('button2', str)
    // })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
