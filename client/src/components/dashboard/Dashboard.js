// rcc + `tab`
import React, { Component } from 'react'

// for redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {

	// lifecycle method
	componentDidMount(){  // use this method because we want `getCurrentProfile` called right away
		this.props.getCurrentProfile();
	}

	render() {
		return (
			<div>
				<h1>Dashboard Fucker</h1>
			</div>
		)
	}
}

export default connect(null, { getCurrentProfile })(Dashboard);