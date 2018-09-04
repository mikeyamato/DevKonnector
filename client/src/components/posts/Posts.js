// rcc = class based component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
	componentDidMount(){  // as soon as this `Posts` component mounts we want to call `getPosts` to fetch it
		this.props.getPosts();
	}

	render() {
		const { posts, loading } = this.props.post;
		let postContent; 

		if(posts === null || loading){
			postContent = <Spinner />
		} else {
			postContent = <PostFeed posts={posts} />  // pass in a property of `posts`
		}

		return (
			<div className='feed'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired  // object because we're getting the post state and not the post array. post array is within the post state. so it'll be `this.props.post.posts`. 
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
