const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	username: { type: String, required: [true, 'Required field'] },
	email: { type: String, required: [true, 'Required field'] },
	password: {
		type: String,
		required: [true, 'Required field'],
	},
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'role',
			required: true,
		},
	],
});

const userModel = mongoose.model('user', userSchema, 'user');
module.exports = userModel;
