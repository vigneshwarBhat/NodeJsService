const db = require('../helper/db');
const checkUserNameAndEmailAvailable = async (req, res, next) => {
	try {
		const { username, email } = req.body;
		const user = await db.user.findOne({ username: username });
		if (user) {
			res
				.status(400)
				.send({ message: 'username already is use', errorcode: 102 });
			return;
		}
		const userDetail = await db.user.findOne({ email: email });
		if (userDetail) {
			res.status(400).send({ message: 'email already is use', errorcode: 103 });
			return;
		}
		next();
	} catch (error) {
		res.status(500).send({ message: error, errorcode: 500 });
		return;
	}
};

const isRoleValid = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!db.roles.includes(req.body.roles[i])) {
				res.status(400).send({ message: 'Not valid role', errorcode: 104 });
				return;
			}
		}
	}
	next();
};

module.exports = {
	checkUserNameAndEmailAvailable,
	isRoleValid,
};
