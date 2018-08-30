// naming convention for models is to be singular and begin w/ a capital.

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// create schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);