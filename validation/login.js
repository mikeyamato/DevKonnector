const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){  // takes in data
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';  // if `data.email` is not empty then `data.email` = `data.email`. otherwise it is an empty string. 

	data.password = !isEmpty(data.password) ? data.password : '';  // if `data.password` is not empty then `data.password` = `data.password`. otherwise it is an empty string. 

	// check to see if email is email
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid';
	}
	
	// check to see if email is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email is required';
	}

	// check to see if password is empty
	if(Validator.isEmpty(data.password)){
		errors.password = 'Password field is required';
	}	

	// check to see password length
	if(!Validator.isLength(data.password, { min: 6, max: 30 })){
		errors.password = 'Password must be at least 6 characters';
	}

	return {
		errors,  // i.e. errors: errors
		isValid: isEmpty(errors)
	}
}