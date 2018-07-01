import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PLAYER = 'GET_PLAYER'

/**
 * INITIAL STATE
 */
const defaultPlayer = {
  level: 0,
  bonus: 0,
  hand: [],
  race: {},
  class: {},
  equipment: {
    head: {},
    torso: {},
    feet: {},
    misc: [],
    hands: []
  }
}

/**
 * ACTION CREATORS
 */
const getPlayer = player => ({type: GET_PLAYER, player})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultPlayer, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.player
    default:
      return state
  }
}
