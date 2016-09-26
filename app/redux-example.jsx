var redux = require('redux');
var axios = require('axios');

var actions = require('./actions/index');
var store = require('./store/configurestore').configure();

console.log('starting redux example');

var unsubscribe = store.subscribe(() => {
	const state = store.getState();
	console.log('Current State: ', state);

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'FETCHING...';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">View Your Location</a>`;
	}

});

//--------------------------------------------
//Redux Dispatch calls
//--------------------------------------------
store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('John'));
store.dispatch(actions.changeName('Mark'));

store.dispatch(actions.addHobby('Qi Gong'));
store.dispatch(actions.addHobby('Programming'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addHobby('Bodybuilding'));

store.dispatch(actions.addMovie('Spiderman','Action'));
store.dispatch(actions.addMovie('Batman','Action'));

store.dispatch(actions.removeMovie(2));

console.log('name should be mark', store.getState());
