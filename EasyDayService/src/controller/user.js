const config = require('../config/config');
const db = require('../helper/db');
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 8),
		});

		await user.save();
		if (req.body.roles) {
			const roleList = await Role.find({
				name: { $in: req.body.roles },
			});
			user.roles = roleList.map((role) => role._id);
			await user.save();
			res.status(200).send({ message: 'User registered successfully.' });
			return;
		} else {
			const role = await Role.findOne({ name: 'user' });
			user.roles = role._id;
			await user.save();
			res.status(200).send({ message: 'User registered successfully.' });
			return;
		}
	} catch (error) {
		res.status(500).send({ message: error, errorcode: 500 });
		return;
	}
};

const Login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username }).populate('roles');
		if (!user) {
			return res
				.status(401)
				.send({ message: 'Invalid user name', errorcode: 100 });
		}
		var isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.send({ message: 'Invalid password', errorcode: 101 });
		}
		var token = jwt.sign({ id: user.id }, config.jwtSecrete, {
			expiresIn: 86400,
		});
		var authorities = [];

		for (let i = 0; i < user.roles.length; i++) {
			authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
		}
		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			roles: authorities,
			accessToken: token,
		});
		return;
	} catch (error) {
		res.status(500).send({ message: error, errorcode: 500 });
		return;
	}
};

module.exports = { Register, Login };
