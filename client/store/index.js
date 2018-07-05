import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
// import game from './game'
import handReducer from './handReducer';
import game from './gameReducer';

const reducer = combineReducers({ user, game });
// console.log("THE REDUCER", reducer)
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })));
const store = createStore(reducer, middleware);

// console.log("THE STORE", store.getState())

export default store;
// export * from './user'
// export * from './gameReducer'
