import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
	profile: null,
	profiles: null, 
	loading: false
};

export default function(state = initialState, action){
	// switch statement depending on the action being called
	switch(action.type){  // tied to actions > types.js
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,  // from profileActions.js
				loading: false
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			};
		default: 
			return state;
	}
}