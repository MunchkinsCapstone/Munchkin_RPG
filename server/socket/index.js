module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('button One', () => {
      socket.broadcast.emit('button One')
    })

    socket.on('button2', str => {
      socket.broadcast.emit('button2', str)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
