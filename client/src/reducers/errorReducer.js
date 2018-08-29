import { GET_ERRORS } from '../actions/types';

const initialState = {};  // have an empty initial state because this will be the errors object 

export default function(state = initialState, action){
	switch (action.type){
		case GET_ERRORS:
			return action.payload;  // from actions > authActions.js
		default:
			return state;
	}
}