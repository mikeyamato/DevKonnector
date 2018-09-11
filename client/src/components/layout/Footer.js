import React, { Component } from 'react'

class Footer extends Component {
	render() {
		return (
			<footer className="bg-dark text-white mt-5 p-4 text-center">
				Copyright &copy; {new Date().getFullYear()} <a href='https://github.com/mikeyamato/DevKonnector' target='_blank' rel="noopener noreferrer">DevKonnector</a>
			</footer>
		)
	}
}

export default Footer;

// add `rel="noopener noreferrer"` to remove security vulnerability w/ `target='_blank'`