import socket from '.././socket'
const initialState = {
  user: []
}
//ACTION TYPE

const CREATE_USERNAME = 'CREATE_USERNAME'

//ACTION CREATOR
export function createUserName(user) {
  return {
    type: CREATE_USERNAME,
    user
  }
}

//REDUCE
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USERNAME:
      return Object.assign({}, state, {
        user: state.user.concat(action.user)
      })
    default:
      return state
  }
}
