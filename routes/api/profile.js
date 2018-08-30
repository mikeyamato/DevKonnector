// deal with personal info

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');  // this is to be used for our protected routes

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// Load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route: GET api/profile/test
// @desc: tests profile route
// @access: public
router.get('/test', (req, res) => res.json({msg: "profile works"}));

// @route: GET api/profile
// @desc: get current user's profile
// @access: private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {  // using `jwt` that was created in config file. `req, res` is the callback.
	const errors = {};

	Profile.findOne({ user: req.user.id })  // using `Profile` model, looking at `user` we'll compare this with `req.user.id`
		.populate('user', ['name', 'avatar'])  // populate from `user` the `name` and `avatar`
		.then(profile => {  // take the profile that's given to us and test to see if there's a profile
			if(!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));  // send along what ever `err` exists.
});

// @route: GET api/profile/all  
// @desc: get all profiles
// @access: public
router.get('/all', (req, res) => {
	const errors = {}; 
	Profile.find()
		.populate('user', ['name', 'avatar'])  // populate from `user` the `name` and `avatar`
		.then(profiles => {
			if(!profiles){
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors)
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({profiles: 'there are no profiles'}))
})

// @route: GET api/profile/handle/:handle  // `:handle` will get hit by the backend route only
// @desc: get profile by handle
// @access: public
router.get('/handle/:handle', (req, res) => {
	const errors = {};  // initialize errors
	Profile.findOne({ handle: req.params.handle })  // `req.params.handle` will grab whatever is in `:handle`
		.populate('user', ['name', 'avatar'])  // populate from `user` the `name` and `avatar`
		.then(profile => {
			if(!profile){
				errors.noprofile = 'there is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);  // if no errors, pass along the profile
		})
		.catch(err => res.status(404).json(err));  // we'll pass into json whatever `err` is returned in `err` (right after `catch`)
})

// @route: GET api/profile/user/:user_id  // `:user_id` will get hit by the backend route only
// @desc: get profile by user id
// @access: public
router.get('/user/:user_id', (req, res) => {
	const errors = {};  // initialize errors
	Profile.findOne({ user: req.params.user_id })  // `req.params.user_id` will grab whatever is in `:user_id`
		.populate('user', ['name', 'avatar'])  // populate from `user` the `name` and `avatar`
		.then(profile => {
			if(!profile){
				errors.noprofile = 'there is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);  // if no errors, pass along the profile
		})
		.catch(err => res.status(404).json({ profile: 'there is no account by that id' })); 
})


// @route: POST api/profile
// @desc: create or edit user profile
// @access: private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {  // specifying what strategy (`jwt`). `req, res` is the callback.
	
	const { errors, isValid } = validateProfileInput(req.body);
	
	// check validation
	if(!isValid){
		// return any errors with 400 status
		return res.status(400).json(errors);
	}


	// get fields from req.body
	const profileFields = {};
	profileFields.user = req.user.id;  // separate b/c this doesn't come from req.body. will include name, avatar, email.
	if(req.body.handle){ profileFields.handle = req.body.handle; } // in one liner, you don't need curly brackets, just a space?
	if(req.body.company){ profileFields.company = req.body.company; }
	if(req.body.website){ profileFields.website = req.body.website; }
	if(req.body.location){ profileFields.location = req.body.location; }
	if(req.body.bio){ profileFields.bio = req.body.bio; }
	if(req.body.status){ profileFields.status = req.body.status; }
	if(req.body.githubusername){ profileFields.githubusername = req.body.githubusername; }
	
	// skills - split into array
	if(typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');  // comes as a csv
	}

	// social
	profileFields.social = {};  // initialize since they're nested
	if(req.body.youtube){ profileFields.social.youtube = req.body.youtube; }  // if it comes in as `req.body.youtube` then we'll want to set `profileFields.social.youtube` to the value of `req.body.youtube`
	if(req.body.twitter){ profileFields.social.twitter = req.body.twitter; }
	if(req.body.facebook){ profileFields.social.facebook = req.body.facebook; }
	if(req.body.linkedin){ profileFields.social.linkedin = req.body.linkedin; }
	if(req.body.instagram){ profileFields.social.instagram = req.body.instagram; }

	// look for the user
	Profile.findOne({ user: req.user.id })  // find `user` by `req.user.id`
		.then(profile => {
			if(profile){
				// update (if profile exists) 
				Profile.findOneAndUpdate(
					{ user: req.user.id }, 
					{ $set: profileFields }, 
					{ new: true }
				)
				.then(profile => res.json(profile));
			} else {
				// create

				// check if handle exists
				Profile.findOne({ handle: profileFields.handle })
					.then(profile => {  // `profile` is given back
						if (profile){
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}

						// save profile
						new Profile(profileFields).save()
							.then(profile => res.json(profile));
					})
			}
		});
	
	
});

// @route: POST api/profile/experience
// @desc: Add experience to profile
// @access: private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateExperienceInput(req.body);
	
	// check validation
	if(!isValid){
		// return any errors with 400 status
		return res.status(400).json(errors);
	}
	
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			}

			// add to experience array
			profile.experience.unshift(newExp);
			profile.save()
				.then(profile => res.json(profile));
		})
});

// @route: POST api/profile/education
// @desc: Add education to profile
// @access: private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);
	
	// check validation
	if(!isValid){
		// return any errors with 400 status
		return res.status(400).json(errors);
	}
	
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			}

			// add to experience array
			profile.education.unshift(newEdu);
			profile.save()
				.then(profile => res.json(profile));
		})
});

// @route: DELETE api/profile/experience/:exp_id
// @desc: Delete experience from profile
// @access: private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			
			// get remove index
			const removeIndex = profile.experience  // `experience` is an array
				.map(item => item.id)
				.indexOf(req.params.exp_id);

			// splice out of array
			profile.experience.splice(removeIndex, 1);

			// save
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json(err));
});

// @route: DELETE api/profile/education/:edu_id
// @desc: Delete education from profile
// @access: private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			
			// get remove index
			const removeIndex = profile.education  // `education` is an array
				.map(item => item.id)
				.indexOf(req.params.edu_id);

			// splice out of array
			profile.education.splice(removeIndex, 1);

			// save
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json(err));
});

// @route: DELETE api/profile
// @desc: Delete user & profile
// @access: private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			User.findOneAndRemove({ _id: req.user.id })
				.then(() => res.json({ success: true }));
		})
});

module.exports = router;