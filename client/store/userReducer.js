const RECEIVE_USER = 'RECEIVE_USER'

const initialState = {
    users: []
}

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, users: [...state.users, action.user] }
        default:
            return state
    }
}