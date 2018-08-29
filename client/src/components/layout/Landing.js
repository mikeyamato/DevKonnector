import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';  // for use with `mapStateToProps` which means we'll have properties. Whenever you have properties in our component we should add them to our `PropTypes`.
import { connect } from 'react-redux'

class Landing extends Component {

	// lifecycle component
	componentDidMount(){
		if(this.props.auth.isAuthenticated){  // check to see if we're logged in
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Developer Connector
								</h1>
								<p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
								<Link to="/login" className="btn btn-lg btn-light">Login</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({   
	auth: state.auth  // since we brought in the auth state into the auth property we now have access to `isAuthenticated`
})

export default connect (mapStateToProps)(Landing);
