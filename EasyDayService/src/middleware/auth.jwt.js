const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../helper/db');

const verifyToken = async (req, res, next) => {
	const token = req.header['Authorization'];
	if (!token) {
		res
			.status(403)
			.send({ message: 'authorization header missing', errorcode: 105 });
	}

	jwt.verify(token, config.jwtSecrete, (err, decoded) => {
		if (err) {
			res.status(403).send({ message: 'un authorized', errorcode: 106 });
		}
		req.userId = decoded.id;
		next();
	});
};

const isAdmin = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const user = await db.user.findById(userId);
		const roles = await db.role.find({ _id: { $in: user.roles } });
		for (let i = 0; i < roles.length; i++) {
			if (roles[i] === 'admin') {
				next();
				return;
			} else {
				res
					.status(403)
					.send({ message: 'Require Admin Role!', errorcode: 107 });
				return;
			}
		}
		res.status(403).send({ message: 'Require Admin Role!', errorcode: 108 });
		return;
	} catch (error) {
		res.status(500).send({ message: 'oops!! error occured', errorcode: 500 });
		return;
	}
};

const isUser = async (req, res, next) => {
	try {
		const { userId } = req.body;
		const user = await db.user.findById(userId);
		const roles = await db.role.find({ _id: { $in: user.roles } });
		for (let i = 0; i < roles.length; i++) {
			if (roles[i] === 'user') {
				next();
				return;
			} else {
				res.status(403).send({ message: 'Require user Role!', errorcode: 109 });
				return;
			}
		}
		res.status(403).send({ message: 'Require user Role!', errorcode: 110 });
		return;
	} catch (error) {
		res.status(500).send({ message: 'oops!! error occured', errorcode: 500 });
		return;
	}
};
module.exports = {
	isAdmin,
	isUser,
	verifyToken,
};
