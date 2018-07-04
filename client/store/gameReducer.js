import socket from '../socket'

// ACTION TYPES
// const GET_PLAYERS = 'GET_PLAYERS';
const START_GAME = 'START_GAME'

// INITIAL STATE
const initialGame = {
  players: ['Yang', 'Oz', 'Graham', 'Raymond'],
  currentPlayer: {},
  playerOrder: [],
  isActive: false,
  battle: {
    isActive: false
  }
}

// ACTION CREATOR
// const getPlayers = (players) => ({ type: GET_PLAYERS, players });
export const startGame = gameObj => {
  console.log('reducer', gameObj)
  return {
    type: START_GAME,
    game: gameObj
  }
}

const detachSelfRef = game => {
  game.battle.game = null
  game.playerOrder.forEach(player => (player.game = null))
  return game
}

// /* THUNK CREATORS */
export const startGameThunk = gameObj => {
  return function thunk(dispatch) {
    detachSelfRef(gameObj)
    // console.log(gameObj, 'AFTER DETACH')
    socket.emit('gameStarted', gameObj)
  }
}

// REDUCER
export default function(state = initialGame, action) {
  switch (action.type) {
    // case GET_PLAYERS:
    //     return { ...state, players: action.players };
    case START_GAME:
      console.log('WILL RETURN NEW STATE IN REDUCER', action.game)
      return action.game
    default:
      return state
  }
}
