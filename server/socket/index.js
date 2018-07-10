//SERVER SOCKET
let rooms = []
const chalk = require('chalk')
const magentaLog = x => console.log(chalk.magenta(x))

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('gameStarted', game => {
      io.sockets.emit('gameBegin', game)
    })
    socket.on('new message', message => {
      socket.broadcast.emit('sent message', message)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
