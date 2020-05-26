const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({
			status: 200,
			message: 'Welcome to the backend server 🤘🏼💀✨'
	})
})

module.exports = server;