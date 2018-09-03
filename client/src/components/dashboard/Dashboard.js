// rcc + `tab`
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// for redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {

	// lifecycle method
	componentDidMount(){  // use this method because we want `getCurrentProfile` called right away
		this.props.getCurrentProfile();
	}

	onDeleteClick(){
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if(profile === null || loading){
			dashboardContent = <Spinner />
		} else {
			// check if logged in user has profile data
			if(Object.keys(profile).length > 0){  // `Object.keys` just gets keys to an object. here it is for the profile object. if there's anything inside it means a profile exists. 
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							welcome 
							<Link to={`/profile/${profile.handle}`}>
								{ user.name }
							</Link>
						</p>
						<ProfileActions />
						{/* TODO: xp and edu */}
						<div style={{ marginBottom: '60px' }} />
						<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
					</div>
				);
			} else {
				// user is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							welcome { user.name }
						</p>
						<p>
							you have not set up a profile. please do so.
						</p>
						<Link to='/create-profile' className='btn btn-lg btn-info'>
							create profile
						</Link>
					</div>
				)
			}
		}

		return (
			<div className='dashboard'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">
								Dashboard
							</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
}

// bring 2 things in from redux into the dashboard (profile state and auth state)
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);