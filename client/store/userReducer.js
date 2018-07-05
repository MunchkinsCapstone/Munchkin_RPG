//ACTION TYPE
const RECEIVED_USER = 'RECEIVED_USER'


const initialState = {
    users: {}
}

//ACTION CREATOR
export const receiveUser = (user) => {
    return {
        type: RECEIVED_USER,
        payload: user
    }
}

//REDUCER
export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVED_USER:
            return Object.assign({}, state, { users: action.user })
        default:
            return state;
    }
}

