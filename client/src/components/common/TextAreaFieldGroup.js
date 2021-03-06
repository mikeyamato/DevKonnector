// copied over from `TextFieldGroup.js` with some properties removed like `type` because that's for input

import React from 'react';
// classnames acts like an if statement. if true, then...
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({  // pass in the many differnt properties this will take
	name, 
	placeholder,
	value,
	error,
	info,
	onChange
}) => {
	return(
		<div className="form-group">
			<textarea 
				className={classnames('form-control form-control-lg', { 'is-invalid': error })}  // instead of `'is-invalid': errors.email`
				// was `className="form-control form-control-lg"`
				// first argument is default
				// second argument appears only if `errors.email` exists. errors comes from our state, which comes from our validator files
				placeholder={placeholder}  // instead of `placeholder="Email Address"`
				name={name}  // instead of `name="email"`
				value={value}  // instead of `value={this.state.email}`
				// this pertains to the state name value
				onChange={onChange}  // instead of `onChange={this.onChange}`
			/>
			{info && <small className='form-text text-muted'>{info}</small>} 
			{error &&   // instead of `errors.email`
				<div className='invalid-feedback'>
					{error}  {/* instead of `errors.email` */}
				</div>
			}
		</div>
	);
};

// add propTypes
TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

export default TextAreaFieldGroup;

