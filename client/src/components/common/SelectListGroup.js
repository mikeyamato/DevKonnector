// copied over from `TextAreaFieldGroup.js` 

import React from 'react';
// classnames acts like an if statement. if true, then...
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({  // pass in the many differnt properties this will take
	name, 
	value,
	error,
	info,
	onChange,
	options
}) => {
	const selectOptions = options.map(option => (  // for each option passed in and mapped through, we'll call it option then we'll render an option tag with a key and value pair
		<option 
			key={option.label}
			value={option.value}
		>
			{option.label}
		</option>
	));
	
	return(
		<div className="form-group">
			<select 
				className={classnames('form-control form-control-lg', { 'is-invalid': error })}  // instead of `'is-invalid': errors.email`
				// was `className="form-control form-control-lg"`
				// first argument is default
				// second argument appears only if `errors.email` exists. errors comes from our state, which comes from our validator files
				name={name}  // instead of `name="email"`
				value={value}  // instead of `value={this.state.email}`
				// this pertains to the state name value
				onChange={onChange}  // instead of `onChange={this.onChange}`
			>
				{selectOptions}
			</select>
			{info && <small className='form-text text-muted'>{info}</small>} 
			{error && (  // instead of `errors.email`
				<div className='invalid-feedback'>
					{error}  {/* instead of `errors.email` */}
				</div>
			)}
		</div>
	)
}

// add propTypes
SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired
}



export default SelectListGroup;

