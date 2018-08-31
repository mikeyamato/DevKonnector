// rcc + `tab` = class based component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';


class CreateProfile extends Component {
	// create all the component state values
	constructor(props){
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){  // `nextProps` includes any new properties
		if(nextProps.errors){
			this.setState({ errors: nextProps.errors })  // this takes errors out of the state below within `render()` (line 53 or so) and displays them in the field (i.e. `error={errors.twitter}`)
		}
	}

	onSubmit(e){
		e.preventDefault();
		//console.log('submit');  // call an action from `profileActions.js`
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		} 
		this.props.createProfile(profileData, this.props.history);  // using props because we are calling a redux action. this won't work without bringing in `withRouter`
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	
	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {  // if false, then nothing will appear
			socialInputs = (
				<div> 
					{/* Twitter */}
					<InputGroup
						placeholder='Twitter Profile URL'
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					{/* Facebook */}
					<InputGroup
						placeholder='Facebook Profile URL'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					{/* LinkedIn */}
					<InputGroup
						placeholder='LinkedIn Profile URL'
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					{/* YouTube */}
					<InputGroup
						placeholder='YouTube Profile URL'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					{/* Instagram */}
					<InputGroup
						placeholder='Instagram Profile URL'
						name='instagram'
						icon='fab fa-instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			)
		} 

		// create options for SelectListGroup pull down menu
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Jr. Developer', value: 'Jr. Developer' },
			{ label: 'Sr. Developer', value: 'Sr. Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student/Learning', value: 'Student/Learning' },
			{ label: 'Instructor/Teacher', value: 'Instructor/Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">
								create your profile
							</h1>
							<p className="lead text-center">
								let's get some information to make your profile stand out.
							</p>
							<small className="d-block pb-3">
								* = required fields
							</small>
							<form onSubmit={this.onSubmit}>
								{/* Handle */}
								<TextFieldGroup 
									placeholder='* Profile Handle'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info='A unique handle for your profile URL. Your full name, company name, nickname, etc.'
								/>
								{/* Status */}
								<SelectListGroup 
									placeholder='* Status'
									name='status'
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info='Give us an idea of where you are at in your career.'
								/>
								{/* Company */}
								<TextFieldGroup 
									placeholder='Company'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info='Could be your own company or one you work for.'
								/>
								{/* Website */}
								<TextFieldGroup 
									placeholder='Website'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info='Could be your own website or a company one.'
								/>
								{/* Location */}
								<TextFieldGroup 
									placeholder='Location'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info='City or city & state suggested (e.g. Los Angeles, CA).'
								/>
								{/* Skills */}
								<TextFieldGroup 
									placeholder='Skills'
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info='Please use commas to separate values (e.g. HTML,CSS,React).'
								/>
								{/* GitHub Username */}
								<TextFieldGroup 
									placeholder='GitHub Username'
									name='githubusername'
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info='If you want your latest repos and a GitHub link, include your username.'
								/>
								{/* Bio */}
								<TextAreaFieldGroup 
									placeholder='Short Bio'
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info='Tell us about yourself.'
								/>
								{/* Social */}
								<div className="mb-3">
									<button onClick={() => {
										this.setState(prevState => ({  // set state, then pass in `prevState`
											displaySocialInputs: !prevState.displaySocialInputs  // state will toggle `displaySocialInputs`
										}))
									}} className="btn btn-light">
										Add Social Network Links
									</button>
									<span className="text-muted">
										Optional
									</span>
								</div>
								{/* create variable to hold social inputs */}
								{socialInputs}
								<input type="submit" value="Submit" className='btn btn-info btn-block mt-4'/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));  // must wrap the component we are exporting with `withRouter`