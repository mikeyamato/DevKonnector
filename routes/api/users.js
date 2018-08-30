// deal w/ authentication

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport'); 

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// load `User` model
const User = require('../../models/User');

// @route: GET api/users/test
// @desc: tests users route
// @access: public
router.get('/test', (req, res) => res.json({msg: "users works"}));

// @route: POST api/users/register
// @desc: register a user
// @access: public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);  // destructuring...pulling `errors` and `isValid` out from `validateRegisterInput`
	// anything that pulls in `req.body` can be validated with this

	// check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			errors.email = 'email already exists'
			if (user) {
				return res.status(400).json(errors);
			}
			else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', // size
					r: 'pg', // gravatar image rating
					d: 'mm' // default
				});

				const newUser = new User({
					name: req.body.name,  // uses body-parser
					email: req.body.email,
					avatar, // also using just `avatar: avatar` works
					password: req.body.password 
				}); 
				// encrypt password
				bcrypt.genSalt(10, (err, salt) => {  // takes in 10 characters
					bcrypt.hash(newUser.password, salt, (err, hash) => {  // hash password
						if (err) throw err;
						newUser.password = hash; 
						newUser  // save encrypted password
							.save()
							.then(user => res.json(user))  // return created user 
							.catch(err => console.log(err));  // if something goes wrong, catch err
					});
				});
			}
		});
});

// @route: POST api/users/login
// @desc: login a user / returning JWT token
// @access: public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);  // destructuring...pulling `errors` and `isValid` out from `validateLoginInput`
	// anything that pulls in `req.body` can be validated with this
	
	// check validation
	if(!isValid){
		return res.status(400).json(errors);
	}
	
	// pw: 123456
	// eamil: mikeyamato@gmail.com
	const email = req.body.email; 
	const password = req.body.password; 

	// find user by email
	User.findOne({ email })
		.then(user => {
			// check for user
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors)
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						// User matched
						const payload = { id: user.id, name: user.name, avatar: user.avatar }  // create jwt payload 

						// sign token
						jwt.sign(
							payload, 
							keys.secretORKey, 
							{ expiresIn: 3600 }, 
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								})
							}
						); 
					} else {
						errors.password = 'password incorrect'; 
						return res.status(400).json(errors);
					}
				});
		});
});

// @route: GET api/users/current
// @desc: return current user
// @access: private
router.get('/current', 
	passport.authenticate('jwt', { sesssion: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;