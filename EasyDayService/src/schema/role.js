const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roleSchema = new schema({
	name: String,
});

const roleModel = mongoose.model('role', roleSchema, 'role');
module.exports = roleModel;
