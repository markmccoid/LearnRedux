var redux = require('redux');

console.log('starting redux example');

const stateDefault = {
		name: 'Anonymous',
		hobbies: [],
		movies: []
};

//--------------------------------------------
//-Redux Reducer
//--------------------------------------------
var reducer = function () {
	//Create a closure over the ID variables to keep out of Global scope
	var nextHobbyID = 1;
	var nextMovieID = 1;
	return (
		(state = stateDefault, action) => {
		//state = state || {name: 'Anonymous'};

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
			case 'REMOVE_HOBBY':
				return {
					...state,
					hobbies: state.hobbies.filter( (item) => item.hobbyID !== action.hobbyid)
				}
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
			case 'REMOVE_MOVIE':
				return {
					...state,
					movies: state.movies.filter((movie) => movie.movieID !== action.id)
				}
			default:
				return state;
		}
	});
}();//Must invoke function so that it returns the ES6 function

//--------------------------------------------
//-Create Store and subscribe callback
//--------------------------------------------
var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f));

var unsubscribe = store.subscribe(() => {
	console.log('Current State: ', store.getState());
})

//--------------------------------------------
//Redux Dispatch calls
//--------------------------------------------
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
	type: 'REMOVE_HOBBY',
	hobbyid: 2
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Bodybuilding'
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
store.dispatch({
	type: 'REMOVE_MOVIE',
	id: 1
});

console.log('name should be mark', store.getState());

