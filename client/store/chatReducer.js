//ACTION TYPES
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const SEND_MESSAGE = 'SEND_MESSAGE'
//const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

//INITIAL STATE
const initialState = {
  newMessage: {},
  chatLog: []
}

//ACTION CREATORS
export const writeMessage = message => {
  return {
    type: WRITE_MESSAGE,
    message
  }
}

export const sendMessage = message => {
  return {
    type: SEND_MESSAGE,
    message
  }
}

//REDUCER
export default function (state = initialState, action) {
  console.log('action',
    action
  )
  switch (action.type) {
    case WRITE_MESSAGE:
      return { ...state, newMessage: action.message.note }
    case SEND_MESSAGE:
      return {
        ...state, chatLog: [...state.chatLog, {
          user: action.message.user,
          message: `${new Date().toLocaleTimeString().slice(0, -6)} ${
            action.message.note
            }`
        }]
      }
    default:
      return state
  }
}
