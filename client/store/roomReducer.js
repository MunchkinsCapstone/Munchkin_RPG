import socket from '.././socket'
//initialState

// const state = {
//   listUsers: [],
//   status: false
// }

const initialState = []

//Action Types
const JOIN_ROOM = 'JOIN_ROOM'

//ACTION CREATOR
export function joinRoom(newRoom) {
  return {
    type: JOIN_ROOM,
    newRoom
  }
}

//THUNKS

//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return [action.newRoom]
    default:
      return state
  }
}

// import socket from '.././socket'

// //Action Types

// const CREATE_ROOM = 'CREATE_ROOM'
// const JOIN_ROOM = 'JOIN_ROOM'

// // export const createRoom = dispatch => {
// //   return (newRoom, user) => dispatch({
// //     type: CREATE_ROOM,
// //     roomName: newRoom,
// //     user
// //   })
// // }
// export const loadRoom = (rooms) => dispatch => {
//  axios.get(`/api/lobby/`)
//      .then(res => dispatch(getSingleCampus(res.data)))
//      .catch(err => console.error('fetch single campus not working', err))
// }

// export const createRoom = (newRoom, user) => dispatch => {
//  return dispatch({
//    type: CREATE_ROOM,
//    roomName: newRoom,
//    user
//  })
// }

// // export const createRoom = dispatch => {
// //   return (newRoom, user) => dispatch(receiveRoom(newRoom,user))
// // }

// //Action Creator

// export function joinRoom(user) {
//  return {
//    type: JOIN_ROOM,
//    user
//  }
// }

// //Reducer
// export default function roomReducer(state = {}, action) {
//  switch (action.type) {
//    case CREATE_ROOM:
//      return {
//        ...state,
//        name: action.roomName,
//        users: [action.user]
//      }
//    case JOIN_ROOM:
//      return {
//        ...state,
//        users: [...users, action.newUser]
//      }
//    default:
//      return state
//  }
// }
