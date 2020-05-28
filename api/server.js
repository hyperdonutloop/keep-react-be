const express = require('express');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const cardsRouter = require('../routes/card-routes.js');
const authenticate = require('../auth/restricted-middleware.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/api/cards', authenticate, cardsRouter)

server.get('/', (req, res) => {
	res.status(200).json({
			status: 200,
			message: 'Welcome to the backend server 🤘🏼💀✨'
	})
})

module.exports = server;