import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';  // once `SET_CURRENT_USER` is dispatched we catch it in the authReducer 

const initialState = {
	isAuthenticated: false,
	user: {}
}

export default function(state = initialState, action){  // function takes in initial state and an action
	
	// testing the reducers where the action have been dispatched
	switch(action.type){
		case SET_CURRENT_USER:
			return {
				...state, 
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload   
			}
		default: 
			return state;
	}
};