const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./src/routes/user');
const database = require('./src/helper/db');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
database.connect();
app.use('/api/user', userRouter);
app.listen(3000, () => {
	console.log('server started');
});
module.exports = app;
