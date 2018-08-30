const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){  // takes in data
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';  // if `data.text` is not empty then `data.text` = `data.text`. otherwise it is an empty string. 

	if(!Validator.isLength(data.text, { min: 10, max: 300 })){
		errors.text = 'post must be 10 - 300 characters';
	}
	
	// check to see if email is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.text)){
		errors.text = 'Text is required';
	}

	return {
		errors,  // i.e. errors: errors
		isValid: isEmpty(errors)
	}
}