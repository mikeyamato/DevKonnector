// by now, we've fetched the post through our action and getting it in `this.props.getPosts()` when the Post component mounts in Posts.js. Then we pass it into the `PostFeed` component in Posts.js. Then mapping through the posts then loading up the `PostItem` component in PostFeed.js

// rcc = component based

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
	onDeleteClick(id){
		this.props.deletePost(id);
	}
	onLikeClick(id){
		this.props.addLike(id);
	}

	onUnlikeClick(id){
		this.props.removeLike(id);
	}

	findUserLike(likes){
		const { auth } = this.props;
		if(likes.filter(like => like.user === auth.user.id).length > 0){
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth } = this.props;  // we have `this.props.auth` because we brought it in via mapStateToProps. we also have `this.props.post` because we brought it in via `post={post}` in PostFeed.js

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img className="rounded-circle d-none d-md-block" src={post.avatar}
								alt="" />
						</a>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						<button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
							<i className={classnames('fas fa-thumbs-up', {
								'text-info': this.findUserLike(post.likes)
							})}></i>
							<span className="badge badge-light">{post.likes.length}</span>
						</button>
						<button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
							<i className="text-secondary fas fa-thumbs-down"></i>
						</button>
						<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
							Comments
						</Link>
						{post.user === auth.user.id ? (
							<button onClick={this.onDeleteClick.bind(this, post._id)} type='button' className="btn btn-danger mr-1">
								<i className="fas fa-times" />
							</button>
							) : null
						}
					</div>
				</div>
			</div>
		)
	}
}

PostItem.propTypes = {
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired   // auth state
}

const mapStateToProps = state => ({
	auth: state.auth  // check to see who's post is who's and make sure only OP is the only person able to delete it 
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);