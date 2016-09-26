var redux = require('redux');
var axios = require('axios');

console.log('starting redux example');


//--------------------------------------------
//-Redux Reducers and Action Generators
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

//--------------------------------------------
//-Name Action Generators
var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name: name
	}
};

//--------------------------------------------
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

//--------------------------------------------
//-Hobby Action Generators
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

//--------------------------------------------
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

//--------------------------------------------
//-Movie Action Generators
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
//--Map Reducer
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
	switch (action.type) {
		case 'START_LOCATION_FETCH':
			return {
				isFetching: true,
				url: undefined
			}
		case 'COMPLETE_LOCATION_FETCH':
			return {
				isFetching: false,
				url: action.url
			}
		default:
			return state;
	}
};
//--------------------------------------------
//-Map Action Generators
var startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	}
};
var completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url: url
	}
};

//--Map; fetching location
var fetchLocation = () => {
	//Update state, letting it know we are starting the fetch process
	store.dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function (response){
		//send the url to the action generator, and then dispatch the return Object
		let url = `http://maps.google.com/?q=${response.data.loc}`;
		console.log(url);
		store.dispatch(completeLocationFetch(url));
	}).catch(function (error) {
    console.log(error);
  });
}



//combine reducers takes an object that defines the reducers to call for each
//part of the state object
var reducer = redux.combineReducers({
	name: nameReducer,
	hobbies: hobbyReducer,
	movies: movieReducer,
	map: mapReducer
});

//--------------------------------------------
//--------------------------------------------
//-Create Store and subscribe callback
//--------------------------------------------
var store = redux.createStore(reducer, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f));

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
fetchLocation();

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

