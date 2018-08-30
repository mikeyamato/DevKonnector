const Validator = require('validator');  
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){  // takes in data
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';  // if `data.handle` is not empty then `data.handle` = `data.handle`. otherwise it is an empty string. 

	data.status = !isEmpty(data.status) ? data.status : '';  // if `data.status` is not empty then `data.status` = `data.status`. otherwise it is an empty string. 
	data.skills = !isEmpty(data.skills) ? data.skills : ''; 

	

	// check to see handle length
	if(!Validator.isLength(data.handle, { min: 2, max: 40 })){
		errors.handle = 'Handle must be between 2 and 40 characters';
	}

	// check to see handle exists...(removed bang, !)
	if(Validator.isEmpty(data.handle)){
		errors.handle = 'Profile handle is required';
	}

	if(Validator.isEmpty(data.status)){
		errors.status = 'Status field is required';
	}

	if(Validator.isEmpty(data.skills)){
		errors.skills = 'Skills field is required';
	}

	if(!isEmpty(data.website)){  // if website IS NOT empty...
		if(!Validator.isURL(data.website)){  //  ...then check for the URL
			errors.website = 'No a valid URL';
		}
	}

	if(!isEmpty(data.youtube)){  // if website IS NOT empty...
		if(!Validator.isURL(data.youtube)){  //  ...then check for the URL
			errors.youtube = 'No a valid URL';
		}
	}

	if(!isEmpty(data.twitter)){  // if website IS NOT empty...
		if(!Validator.isURL(data.twitter)){  //  ...then check for the URL
			errors.twitter = 'No a valid URL';
		}
	}

	if(!isEmpty(data.facebook)){  // if website IS NOT empty...
		if(!Validator.isURL(data.facebook)){  //  ...then check for the URL
			errors.facebook = 'No a valid URL';
		}
	}

	if(!isEmpty(data.linkedin)){  // if website IS NOT empty...
		if(!Validator.isURL(data.linkedin)){  //  ...then check for the URL
			errors.linkedin = 'No a valid URL';
		}
	}

	if(!isEmpty(data.instagram)){  // if website IS NOT empty...
		if(!Validator.isURL(data.instagram)){  //  ...then check for the URL
			errors.instagram = 'No a valid URL';
		}
	}

	return {
		errors,  // i.e. errors: errors
		isValid: isEmpty(errors)  //  valid if `errors` is empty
	}
}