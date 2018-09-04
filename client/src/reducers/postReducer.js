// for the most part, any new resource introduced into the app will need a reducer

import { 
	ADD_POST, 
	GET_POSTS, 
	POST_LOADING,
	DELETE_POST 
} from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	loading: false
}

export default function (state = initialState, action){
	switch(action.type){
		case POST_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			}
		case ADD_POST:
			return {  // return anything in the state object, and with posts, we'll want the new post and the current post (`state.post`). 
				...state,
				posts: [action.payload, ...state.post]
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)  // `action.payload` is the post we want to delete. this will delete the post locally (deleting from state)
			}
		default: 
			return state;
	}
}