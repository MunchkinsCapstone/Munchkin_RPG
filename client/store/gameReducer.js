// ACTION TYPES
// const GET_PLAYERS = 'GET_PLAYERS';
const START_GAME = 'START_GAME'
const KNOCK_KNOCK = 'KNOCK_KNOCK'
const LOOT_ROOM = 'LOOT_ROOM'
const END_TURN = 'END_TURN'
const DISCARD = 'DISCARD'
const EQUIP = 'EQUIP'
const UNEQUIP = 'UNEQUIP'
const EQUIP_TO_HIRELING = 'EQUIP_TO_HIRELING'
const CAST = 'CAST'
const LOOK_FOR_TROUBLE = 'LOOK_FOR_TROUBLE'
const ASSIST = 'ASSIST'

// INITIAL STATE
const initialGame = {
    players: ['Yang', 'Oz', 'Graham', 'Raymond'],
    currentPlayer: {},
    playerOrder: [],
    isActive: false,
    battle: {
        isActive: false
    }
};

// ACTION CREATOR
// const getPlayers = (players) => ({ type: GET_PLAYERS, players });
export const startGame = (gameObj) => {
    // console.log('reducer', gameObj)
    return {
        type: START_GAME,
        game: gameObj
    }
}

export const knockKnock = (gameObj) => {
    console.log('knockknock-reducer', gameObj)
    return {
        type: KNOCK_KNOCK,
        game: gameObj
    }
}

export const lootRoom = () => {
    return {
        type: LOOT_ROOM,
    }
}

// /* THUNK CREATORS */
// export const getPlayersInGame = id => dispatch =>
//   axios
//     .get(`/api/players/${id}`) //queries the database for a list of the players
//     .then(res => dispatch(getPlayers(res.data)))
//     .catch(err => console.log(err));

// REDUCER
export default function (state = initialGame, action) {
    switch (action.type) {
        // case GET_PLAYERS:
        //     return { ...state, players: action.players };
        case START_GAME:
            console.log("WILL RETURN NEW STATE IN REDUCER", action.game)
            return action.game
        case KNOCK_KNOCK:
            return action.game

        default:
            return state;
    }
}
