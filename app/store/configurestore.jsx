var redux = require('redux');
var thunk = require('redux-thunk').default;

export var configure = () => {
	const {nameReducer, hobbyReducer, movieReducer, mapReducer} = require('./../reducers/index');

	//combine reducers takes an object that defines the reducers to call for each
	//part of the state object
	var reducer = redux.combineReducers({
		name: nameReducer,
		hobbies: hobbyReducer,
		movies: movieReducer,
		map: mapReducer
	});

	//--------------------------------------------
	//-Create Store and subscribe callback
	//--------------------------------------------
	var store = redux.createStore(reducer, redux.compose(
			redux.applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f));

	return store;
};
