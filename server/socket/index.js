//SERVER SOCKET
const chalk = require('chalk')
const magentaLog = x => console.log(chalk.magenta(x))
let users = []

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('gameStarted', game => {
      io.sockets.emit('gameBegin', game)
    })
    socket.on('create new user', newUser => {
      console.log('new user', newUser)
      users.push(newUser)
      console.log('server users', users)
      io.sockets.emit('received user', users)
    })
    socket.on('reset users', data => {
      users = data;
    })
    socket.on('new message', message => {
      socket.broadcast.emit('sent message', message)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    socket.on('newUser', user => {
      console.log('socket server user', user)
      io.sockets.emit('receivedUser', user)
    })
  })
}
