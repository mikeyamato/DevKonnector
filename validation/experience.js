const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){  // takes in data
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';  // if `data.title` is not empty then `data.title` = `data.title`. otherwise it is an empty string. 

	data.company = !isEmpty(data.company) ? data.company : '';  // if `data.company` is not empty then `data.company` = `data.company`. otherwise it is an empty string. 

	data.from = !isEmpty(data.from) ? data.from : '';  // if `data.from` is not empty then `data.from` = `data.from`. otherwise it is an empty string. 
	
	// check to see if title is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.title)){
		errors.title = 'Job title is required';
	}

	// check to see if company is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.company)){
		errors.company = 'Company is required';
	}

	// check to see if from is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.from)){
		errors.from = 'From date field is required';
	}

	return {
		errors,  // i.e. errors: errors
		isValid: isEmpty(errors)
	}
}