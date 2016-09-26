//--Name Reducer
export var nameReducer = (state = 'Anonymous', action) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return action.name;
		default:
			return state;
	}
};

//--------------------------------------------
//--Hobby Reducer
export var hobbyReducer = function() {
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
//--Movie Reducer
export var movieReducer = function () {
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
//--Map Reducer
export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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

