var axios = require('axios');
//--------------------------------------------
//-Name Action Generators
export var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name: name
	}
};



//--------------------------------------------
//-Hobby Action Generators
export var addHobby = (hobby) => {
	return {
		type: 'ADD_HOBBY',
		hobby: hobby
	}
};

export var removeHobby = (id) => {
	return {
		type: 'REMOVE_HOBBY',
		hobbyid: id
	}
};



//--------------------------------------------
//-Movie Action Generators
export var addMovie = (movie, genre) => {
	return {
		type: 'ADD_MOVIE',
		movie: movie,
		genre: genre
	}
};

export var removeMovie = (id) => {
	return {
		type: 'REMOVE_MOVIE',
		id: id
	}
};

//--------------------------------------------
//-Map Action Generators
export var startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	}
};
export var completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url: url
	}
};

//--Map; fetching location
export var fetchLocation = () => {
	return (dispatch, getState) => {
			//Update state, letting it know we are starting the fetch process
	dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then(function (response){
		//send the url to the action generator, and then dispatch the return Object
		let url = `http://maps.google.com/?q=${response.data.loc}`;
		console.log(url);
		dispatch(completeLocationFetch(url));
	}).catch(function (error) {
    console.log(error);
  });
	}
}
