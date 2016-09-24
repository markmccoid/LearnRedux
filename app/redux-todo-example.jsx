var redux = require('redux');

console.log('starting todo redux example');

var stateDefault = {
	todos:[],
	showCompleted: false,
	searchText: ''
};
var reducer = (state = stateDefault, action) => {
	//state = state || {name: 'Anonymous'};

	return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);
