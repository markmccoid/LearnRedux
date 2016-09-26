var redux = require('redux');

console.log('starting redux example');


//--------------------------------------------
//-Redux Reducers
//--------------------------------------------
//--Name Reducer
var nameReducer = (state = 'Anonymous', action) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return action.name;
		default:
			return state;
	}
};


//--Hobby Reducer
var hobbyReducer = function() {
	let nextHobbyID = 1;
	return (state = [], action) => {
		switch (action.type) {
			case 'ADD_HOBBY':
				return ([
					...state,
					{
						hobbyID: nextHobbyID++,
						hobby: action.hobby
					}
				]);
			case 'REMOVE_HOBBY':
				return state.filter((hobby) => hobby.hobbyID !== action.hobbyid);
			default:
				return state;
		}
	};
}();//Must invoke function so that it returns the ES6 function

//--Movie Reducer
var movieReducer = function () {
	let nextMovieID = 1;
	return (state = [], action) => {
		switch (action.type) {
			case 'ADD_MOVIE':
				return [
					...state,
					{
						id: nextMovieID++,
						movie: action.movie,
						genre: action.genre
					}
				];
			case 'REMOVE_MOVIE':
				return state.filter((movie) => movie.id !== action.id);
			default:
				return state;
		}
	};
}();//Must invoke function so that it returns the ES6 function

//combine reducers takes an object that defines the reducers to call for each
//part of the state object
var reducer = redux.combineReducers({
	name: nameReducer,
	hobbies: hobbyReducer,
	movies: movieReducer
});

//--------------------------------------------
//-Action Generators
//--------------------------------------------
var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name: name
	}
};

var addHobby = (hobby) => {
	return {
		type: 'ADD_HOBBY',
		hobby: hobby
	}
};

var removeHobby = (id) => {
	return {
		type: 'REMOVE_HOBBY',
		hobbyid: id
	}
};

var addMovie = (movie, genre) => {
	return {
		type: 'ADD_MOVIE',
		movie: movie,
		genre: genre
	}
};

var removeMovie = (id) => {
	return {
		type: 'REMOVE_MOVIE',
		id: id
	}
};
//--------------------------------------------
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
store.dispatch(changeName('John'));

store.dispatch(changeName('Mark'));

store.dispatch(addHobby('Qi Gong'));

store.dispatch(addHobby('Programming'));

store.dispatch(removeHobby(2));

store.dispatch(addHobby('Bodybuilding'));

store.dispatch(addMovie('Spiderman','Action'));
store.dispatch(addMovie('Batman','Action'));

store.dispatch(removeMovie(2));

console.log('name should be mark', store.getState());

