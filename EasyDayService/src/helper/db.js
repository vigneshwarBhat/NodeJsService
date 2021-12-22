const mongoose = require('mongoose');
const user = require('../schema/user');
const role = require('../schema/role');
const config = require('../config/config');
const db = {};
db.connect = async function connect() {
	try {
		await mongoose.connect(
			`mongodb://${config.dbHost}:${config.dbPort}/${config.db}`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		initialize();
	} catch (error) {
		console.log(error);
	}
};
db.user = user;
db.role = role;
db.roles = ['user', 'admin'];
function initialize() {
	db.role.estimatedDocumentCount(async (err, count) => {
		try {
			if (!err && count === 0) {
				const userRole = new role({ name: 'user' });
				await userRole.save();
				const userRole1 = new role({ name: 'admin' });
				await userRole1.save();
			}
		} catch (error) {
			console.log(error);
		}
	});
}

module.exports = db;
