//CLIENT SIDE SOCKET

import io from 'socket.io-client'
import store from './store'
import {startGame} from './store/gameReducer'
const {appendMethods, allCards} = require('./gameLogic')

const socket = io(window.location.origin)

const reattachSelfRef = game => {
  game.battle.game = game
  game.players.forEach(player => (player.game = game))
  return game
}

socket.on('connect', () => {
  console.log('Connected!')
  // socket.on('get rooms', (rooms) => {
  //   console.log('hearing from socket client', rooms)
  // })

  socket.on('gameBegin', game => {
    game = appendMethods.game(game)
    game.players = game.players.map(player => {
      // debugger
      player.hand = player.hand.map(card =>
        appendMethods.card(
          allCards.find(otherCard => otherCard.imageUrl === card.imageUrl)
        )
      )
      player.allEquips = player.allEquips.map(card =>
        appendMethods.card(
          allCards.find(otherCard => otherCard.imageUrl === card.imageUrl)
        )
      )
      return appendMethods.player(player)
    })
    if (game.battle.isActive) {
      game.battle = appendMethods.battle(game.battle)
      game.battle.monster = appendMethods.card(
        allCards.find(
          otherCard => otherCard.imageUrl === game.battle.monster.imageUrl
        )
      )
      game.battle.buffs.monster = game.battle.buffs.monster.map(card =>
        appendMethods.card(
          allCards.find(otherCard => otherCard.imageUrl === card.imageUrl)
        )
      )
      game.battle.buffs.players = game.battle.buffs.monster.map(card =>
        appendMethods.card(
          allCards.find(otherCard => otherCard.imageUrl === card.imageUrl)
        )
      )
    }
    game = reattachSelfRef(game)
    console.log(game)
    store.dispatch(startGame(game))
  })

  // socket.on('roomAdded', payload => {})

  // socket.on('button2', str => {
  //   console.log('here is that string', str)
  // })
})

export default socket
