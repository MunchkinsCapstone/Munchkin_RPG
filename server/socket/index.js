//SERVER SOCKET

const chalk = require('chalk')
const magentaLog = x => console.log(chalk.magenta(x))

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('gameStarted', game => {
      // io.sockets.emit('gameStarted', game)
      socket.emit('checkingGame', game)
      magentaLog(game)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
