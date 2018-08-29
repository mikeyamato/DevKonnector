import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register user
export const registerUser = (userData, history) => dispatch => {  // `dispatch` part of thunk deals with asynchronous data from our backend 
	axios.post('/api/users/register', userData)
		.then(res => history.push('/login'))  // if successful redirect to login
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data  // sent to reducers > errorReducer.js and putting it into a redux state
			})
		);
}

// login - get user token
export const loginUser = (userData) => dispatch => {
	axios.post('/api/users/login', userData)  // pass along `userData`
		.then(res => {
			// save to localstorage
			const { token } = res.data;
			// set token to ls
			localStorage.setItem('jwtToken', token);  // ls only stores a string
			// set token to auth header
			setAuthToken(token); 
			// decode token to get user data
			const decoded = jwt_decode(token);
			// set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
}

// set logged in user
export const setCurrentUser = (decoded) => {
	return {  // dispatch to our reducer
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// log user out
export const logoutUser = () => dispatch => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken');
	// remove auth header for future requests (i.e. `setAuthToken`)
	setAuthToken(false);
	// set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));  // in authReducer.js `SET_CURRENT_USER` will have an empty payload
}