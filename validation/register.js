const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){  // takes in data
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';  // if `data.name` is not empty then `data.name` = `data.name`. otherwise it is an empty string. 

	data.email = !isEmpty(data.email) ? data.email : '';  // if `data.email` is not empty then `data.email` = `data.email`. otherwise it is an empty string. 

	data.password = !isEmpty(data.password) ? data.password : '';  // if `data.password` is not empty then `data.password` = `data.password`. otherwise it is an empty string. 

	data.password2 = !isEmpty(data.password2) ? data.password2 : '';  // `password2` is like the confirmed password

	if(!Validator.isLength(data.name, { min: 2, max: 30 })){
		errors.name = 'Name must be between 2 and 30 characters';
	}

	// check to see if name is empty
	if(Validator.isEmpty(data.name)){
		errors.name = 'Name field is required';
	}

	// check to see if email is empty
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field is required';
	}

	// check to see if email is email
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}

	// check to see if password is empty
	if(Validator.isEmpty(data.password)){
		errors.password = 'Password field is required';
	}	

	// check to see password length
	if(!Validator.isLength(data.password, { min: 6, max: 30 })){
		errors.password = 'Password must be at least 6 characters';
	}

	// check to see if password is empty
	if(Validator.isEmpty(data.password2)){
		errors.password2 = 'Confirm password field is required';
	}	

	// check to see if password2 matches password
	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,  // i.e. errors: errors
		isValid: isEmpty(errors)
	}
}