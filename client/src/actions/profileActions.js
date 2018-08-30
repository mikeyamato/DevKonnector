// get current logged in user's profile

import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

// get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());  // set loading state before it does the request
	axios.get('/api/profile')   // when we hit this endpoint, it's going to call GET_PROFILE and pass along the data (res.data). then profileReducer.js will use this payload. 
		.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_PROFILE,
				payload: {}  // if no profile, return an empty profile
			})
		);
}

// profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}