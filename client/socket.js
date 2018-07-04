//CLIENT SIDE SOCKET

import io from 'socket.io-client'
import store from './store'
import {startGame} from './store/gameReducer'

const socket = io(window.location.origin)

const reattachSelfRef = game => {
  game.battle.game = game
  game.playerOrder.forEach(player => (player.game = game))
  return game
}

socket.on('connect', () => {
  console.log('Connected!')
  // socket.on('get rooms', (rooms) => {
  //   console.log('hearing from socket client', rooms)
  // })

  socket.on('gameBegin', gameObj => {
    reattachSelfRef(gameObj)
  })

  // socket.on('roomAdded', payload => {})

  // socket.on('button2', str => {
  //   console.log('here is that string', str)
  // })
})

export default socket
