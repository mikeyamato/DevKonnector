import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	// component state...not application state
	constructor(){
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '', 
			errors: {}
		}

		// doing the below will save us from typing `onChange = {this.onChange.bind(this)}` to every onChange event  
		this.onChange = this.onChange.bind(this);
		// bind this as well
		this.onSubmit = this.onSubmit.bind(this);
	}

	// lifecycle components
	componentDidMount(){
		if(this.props.auth.isAuthenticated){  // check to see if we're logged in
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({ errors: nextProps.errors });  // we get errors from our redux state and put into props with mapStateToProps, then when we receive new properties and if errors are included then we'll set it to component state
		}
	}

	onChange(e){
		// whenever the user types it will fire off an onChange function and will set whatever is being typed into the state variable
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e){
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		this.props.registerUser(newUser, this.props.history);  // any action we bring in will be through props. this will allow us to use history allows us to redirect from within the action, `registerUser`.
		
	}
	
	render() {
		const { errors } = this.state;  // destructuring. exactly the same as `const errors = this.state.errors;`. we are getting errors from our component state

		// after I submit it will call registerUser in the actions and dispatch to our reducer then fill the user object. we mapped the auth state to a property in the component, then it will test for a user in the names. 

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form noValidate onSubmit={this.onSubmit}>
								
								<TextFieldGroup 
									placeholder='Name'
									name='name'
									type='text'
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>

								<TextFieldGroup 
									placeholder='Email Address'
									name='email'
									type='email'
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
								/>

								<TextFieldGroup 
									placeholder='Password'
									name='password'
									type='password'
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								
								<TextFieldGroup 
									placeholder='Confirm Password'
									name='password2'
									type='password'
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// for React, any properties in my component I should map to PropTypes 
Register.propTypes = {  // `Register` = name of the component
	registerUser: PropTypes.func.isRequired,  // `registerUser` is an action but a property as well 
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}  

// get authState into our component
const mapStateToProps = (state) => ({
	auth: state.auth,  // putting auth state into a property called auth so we can access it with `this.props.auth`. `state.auth` comes from the rootReducer (reducers > index.js). if we named the key something else, we would need to change state.key to the key term. 
	errors: state.errors  // this is accessed via `this.props.errors`
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));