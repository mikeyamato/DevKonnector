// get current logged in user's profile

import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

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

// add experience
export const addExperience = (expData, history) => dispatch => {  // take in `expData` and `history`
	axios
		.post('/api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// delete account & profile
export const deleteAccount = () => dispatch => {  // `dispatch` because we're making an axios request
	if(window.confirm('Are you sure? This cannot be undone!')){
		axios
			.delete('/api/profile')
			.then(res => 
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err => 
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}

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