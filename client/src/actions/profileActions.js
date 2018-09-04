// get current logged in user's profile

import axios from 'axios';

import { 
	GET_PROFILE, 
	GET_PROFILES,  // also include in `profileReducer.js`
	PROFILE_LOADING, 
	CLEAR_CURRENT_PROFILE, 
	GET_ERRORS, 
	SET_CURRENT_USER
} from './types';

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

// get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
	dispatch(setProfileLoading());  // set loading state before it does the request
	axios.get(`/api/profile/handle/${handle}`)   // when we hit this endpoint, it's going to call GET_PROFILE and pass along the data (res.data). then profileReducer.js will use this payload. 
		.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_PROFILE,
				payload: null  
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

// add education
export const addEducation = (eduData, history) => dispatch => {  // take in `eduData` and `history`
	axios
		.post('/api/profile/education', eduData)
		.then(res => history.push('/dashboard'))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// delete experience
export const deleteExperience = (id) => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete education
export const deleteEducation = (id) => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then(res => 
			dispatch({
				type: GET_PROFILES,  // plural
				payload: res.data
			})
		)
		.catch(err => 
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		);
};

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