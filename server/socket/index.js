module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('roomAdded', payload => {
      // console.log('we got here ')
      console.log('payload', payload)
      socket.broadcast.emit('roomAdded', payload)
      // console.log('payload', payload.numberOfRooms)
    })

    // socket.on('button2', str => {
    //   socket.broadcast.emit('button2', str)
    // })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
