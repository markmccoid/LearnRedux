var redux = require('redux');

console.log('starting redux example');

const stateDefault = {
		name: 'Anonymous',
		hobbies: [],
		movies: []
};

var nextHobbyID = 1;

var reducer = (state = stateDefault, action) => {
	//state = state || {name: 'Anonymous'};
	var nextMovieID = 1;
	console.log('new action: ', action);
	switch (action.type)
	{
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			};
		case 'ADD_HOBBY':
			return{
				...state,
				hobbies: [
					...state.hobbies,
					{
						hobbyID: nextHobbyID++,
						hobby: action.hobby
					}
				]
			};
		case 'ADD_MOVIE':
			return {
				...state,
				movies: [
					...state.movies,
					{
						movieID: nextMovieID++,
						movie: action.movie,
						genre: action.genre
					}
				]
			}
		default:
			return state;
	}

};

var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f));

var unsubscribe = store.subscribe(() => {
	console.log('Current State: ', store.getState());
})
var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Mark'
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Qi Gong'
});
store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Programming'
});

store.dispatch({
	type: 'ADD_MOVIE',
	movie: 'Spiderman',
	genre: 'Action'
});
store.dispatch({
	type: 'ADD_MOVIE',
	movie: 'Batman',
	genre: 'Action'
});

console.log('name should be mark', store.getState());
