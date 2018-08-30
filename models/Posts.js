const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const PostSchema = new Schema ({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [  // people's user id will appear instead of up/down votes
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [  // people's user id will appear instead of up/down votes
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);