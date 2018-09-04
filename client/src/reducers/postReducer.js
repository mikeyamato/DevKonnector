// for the most part, any new resource introduced into the app will need a reducer

import { ADD_POST } from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	loading: false
}

export default function (state = initialState, action){
	switch(action.type){
		case ADD_POST:
			return {  // return anything in the state object, and with posts, we'll want the new post and the current post (`state.post`). 
				...state,
				posts: [action.payload, ...state.post]
			}
		default: 
			return state;
	}
}