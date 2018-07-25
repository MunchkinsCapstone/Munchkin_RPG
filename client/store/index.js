import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './userReducer';
// import game from './game'
import handReducer from './handReducer';
import game from './gameReducer';
import chat from './chatReducer'

const reducer = combineReducers({ user, game, chat });
// console.log("THE REDUCER", reducer)
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

// console.log("THE STORE", store.getState())

export default store;
export * from './userReducer'
export * from './gameReducer'
export * from './chatReducer'