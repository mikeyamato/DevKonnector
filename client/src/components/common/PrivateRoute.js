import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (  // for the logic we need some properties to be passed in (i.e. components) 
	<Route 
		{ ...rest }  // add any props passed to route, use `rest`
		render = { props => 
			auth.isAuthenticated === true ? (  // depending on if we are authenticated or not will result in serving one page or another
				<Component {...props} />
			)	: (
				<Redirect to='/login' />
			)
		}
	/>  
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
