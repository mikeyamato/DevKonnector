// get current logged in user's profile

import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

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

// create profile
export const createProfile = (profileData, history) => dispatch => {  // takes in 2 arguments. `history` has to do with redirections
	axios
		.post('/api/profile', profileData)  // take in `profileData`
		.then(res => history.push('/dashboard'))	 // once we get the results, redirect back to the dashboard
		.catch(err => dispatch({
			type: GET_ERRORS,   // will go through the errors reducer
			payload: err.response.data
		}));
}

// profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}

// clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
}