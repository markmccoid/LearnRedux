var redux = require('redux');

console.log('starting todo redux example');

var stateDefault = {
	todos:[],
	showCompleted: false,
	searchText: ''
};
var reducer = (state = stateDefault, action) => {
	//state = state || {name: 'Anonymous'};
	switch (action.type) {
		case 'CHANGE_SEARCHTEXT':
			return {
				...state,
				searchText: action.text
			};
		default:
			return state;
	}

};

//The second argument is for middleware, here we are passing in the needed function for the chrome redux dev tools
//the terniary operater is just checking to make sure the extension exists, if not, it just passes through
var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f));

//subscribe to changes
var unsubscribe = store.subscribe(() => {
	var state = store.getState();
	console.log("searchText is ", state.searchText);
	document.getElementById('app').innerHTML = state.searchText;
})
// unsubscribe();


store.dispatch({
	type: 'CHANGE_SEARCHTEXT',
	text: 'Search Me'
});



store.dispatch({
	type: 'CHANGE_SEARCHTEXT',
	text: 'Something Else'
	});


store.dispatch({
	type: 'CHANGE_SEARCHTEXT',
	text: 'Last Else'
	});
