const isProd = process.env.NODE_ENV === 'production';
require('dotenv').config({ path: isProd ? '.prod.env' : '.env' });

module.exports = {
	serverPort: process.env.SERVER_PORT,
	dbHost: process.env.DBHOST,
	dbPort: process.env.DB_PORT,
	db: process.env.DB,
	environment: process.env.NODE_ENV,
	jwtSecrete: process.env.JWT_SECRETE,
};
