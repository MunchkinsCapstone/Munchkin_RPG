import socket from 'socket.io-client'

//Action Types

const CREATE_ROOM = 'CREATE_ROOM'
const JOIN_ROOM = 'JOIN_ROOM'
//Action Creator
export function createRoom(roomName, user) {
  return {
    type: CREATE_ROOM,
    roomName,
    user
  }
}

export function joinRoom(user) {
  return {
    type: JOIN_ROOM,
    user
  }
}

//Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        name: action.roomName,
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
