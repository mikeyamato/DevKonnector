const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data){  // takes in data
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : '';  // if `data.school` is not empty then `data.school` = `data.school`. otherwise it is an empty string. 

	data.degree = !isEmpty(data.degree) ? data.degree : '';  // if `data.degree` is not empty then `data.degree` = `data.degree`. otherwise it is an empty string. 

	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';  // if `data.fieldofstudy` is not empty then `data.fieldofstudy` = `data.fieldofstudy`. otherwise it is an empty string. 

	data.from = !isEmpty(data.from) ? data.from : '';  // if `data.from` is not empty then `data.from` = `data.from`. otherwise it is an empty string. 
	
	// check to see if school is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.school)){
		errors.school = 'School is required';
	}

	// check to see if degree is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.degree)){
		errors.degree = 'Degree is required';
	}

	// check to see if fieldofstudy is empty
	// order matters when returning `errors`
	if(Validator.isEmpty(data.fieldofstudy)){
		errors.fieldofstudy = 'Field of study is required';
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