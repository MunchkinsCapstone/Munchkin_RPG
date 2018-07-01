import {createStore} from 'redux'

//INITIAL STATE
let initialState = {
  users: [],
  status: false
}

//ACTION TYPES

export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'

//ACTION CREATOR
export const createRoom = user => ({
  type: CREATE_ROOM,
  user
})

export const joinRoom = newUser => ({
  type: JOIN_ROOM,
  newUser
})

//THUNK
export const addRoom = room => {
  return function thunk(dispatch) {}
}

//REDUCER
function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        users: [action.user]
      }
    case JOIN_ROOM:
      return {
        ...state,
        users: [...users, action.newUser]
      }
    default:
      return state
  }
}

const store = createStore(roomReducer)

export default store
