const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  // bringing this in because we deal with a db
const passport = require('passport');  // help protect some routes

// post model
const Post = require('../../models/Posts');
// profile model
const Profile = require('../../models/Profile');

// validation 
const validatePostInput = require('../../validation/post');

// @route: GET api/posts/test
// @desc: tests posts route
// @access: public
router.get('/test', (req, res) => res.json({msg: "posts works"}));

// @route: GET api/posts
// @desc: get all posts
// @access: public
router.get('/', (req, res) => {
	Post.find()  // take our Post model and find
		.sort({date: -1})  // sorts in descending order
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostsfound: 'posts not found'}));
});

// @route: GET api/posts/:id
// @desc: get post by id
// @access: public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)  // take our Post model and find
		.then(post => res.json(post))
		.catch(err => res.status(404).json({nopostfound: 'post not found with that id'}));
});

// @route: POST api/posts
// @desc: create posts
// @access: private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// check validation
	if(!isValid) {
		// if any errors, send 400 with errors object
		return res.status(400).json(errors);
	}
	
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post));
});

// @route: DELETE api/posts/:ID
// @desc: delete post
// @access: private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })  // want to make sure the person deleting this is the owner of the post
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// check for post owner
					if(post.user.toString() !== req.user.id){  // `req.user.id` is a string, `post.user` is not a string
						return res.status(401).json({ notauthorized: 'User not authorized' });
					}
					// Delete
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err => res.status(404).json({ postnotfound: 'no post found' }));
		})
})

// @route: POST api/posts/like/:id
// @desc: like post
// @access: private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })  // want to track the person liking this
		.then(profile => {  // get the profile then find the post by id
			
			// console.log('****', req.params.id);
			// console.log('####', req.user.id);
			// console.log('%%%% Post', Post.findById(req.params.id));

			Post.findById(req.params.id)
				.then(post => {
					// console.log('&&&&', post.likes);
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){  // `> 0` is used because if they already liked it then his id is already in there. 
						return res.status(400).json({ alreadyliked: 'user already like this post'});
					}
					// add user id to like array at the beginning
					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ postnotfound: 'no post found' }));
			})
});

// @route: POST api/posts/unlike/:id
// @desc: unlike post
// @access: private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })  // want to track the person liking this
		.then(profile => {  // get the profile then find the post by id
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){  // `> 0` is used because if they already liked it then his id is already in there. 
						return res.status(400).json({ notliked: 'you have not liked this post'});
					}
					// get remove index
					const removeIndex = post.likes.map(item => item.user.toString())
						.indexOf(req.user.id);  // this gives us the user to remove

					// splice out of array
					post.likes.splice(removeIndex, 1);

					// save
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ postnotfound: 'no post found' }));
			})
});

// @route: POST api/posts/comment/:id   // `:id` = post id
// @desc: add comment to post
// @access: private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	
	// use same validation as POST ('/') since we're only checking against text
	const { errors, isValid } = validatePostInput(req.body);

	// check validation
	if(!isValid) {
		// if any errors, send 400 with errors object
		return res.status(400).json(errors);
	}
	
	Post.findById(req.params.id)
		.then(post => {
			const newComment = {  // create new comment object
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}
			// add to comments array
			post.comments.unshift(newComment);
			// save
			post.save().then(post => 
				res.json(post)
			);  // this will give us back the post and we'll respond with the post
		})
		.catch(err => res.status(404).json({ postnotfound: 'no post found' }));
});

// @route: DELETE api/posts/comment/:id/:comment_id
// @desc: remove comment from post
// @access: private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// check to see if comment exists
			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){  // if zero, comment does not exist
				return res.status(404).json({ commentnotexists: 'comment does not exist' })
			}
			// get remove index
			const removeIndex = post.comments.map(item => item._id.toString())  // take each item and map it to its id
				.indexOf(req.params.comment_id);  // this finds the comment to remove

			// splice comment out of array
			post.comments.splice(removeIndex, 1);  // splice from `removeIndex`

			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'no post found' }));
})

module.exports = router;