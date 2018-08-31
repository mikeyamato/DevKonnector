// copied over from `TextFieldGroup.js` 

import React from 'react';
// classnames acts like an if statement. if true, then...
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({  // pass in the many differnt properties this will take
	name, 
	placeholder,
	value,
	error,
	icon,
	type,
	onChange
}) => {
	return(
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input 
				type={type}  // instead of `type="email"` 
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
			{error && (  // instead of `errors.email`
				<div className='invalid-feedback'>
					{error}  {/* instead of `errors.email` */}
				</div>
			)}
		</div>
	)
}

// add propTypes
InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
	type: 'text'
}

export default InputGroup;

