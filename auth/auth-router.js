const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users-model.js');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 12);
	user.password = hash;

	Users.add(user)
	.then(saved => {
			res.status(201).json(saved)
	})
	.catch(error => {
			res.status(500).json(error)
	});
})

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);
				res.status(200).json({
					status: 200,
					token,
					user: {
						id: user.id,
						firstname: user.firstname,
						lastname: user.lastname,
						username: user.username,
					},
				})
			} else {
				res.status(401).json({ message: 'Invalid Credentials 💀'})
			}
		})
		.catch(error => {
			res.status(500).json(error)
		})
});

function signToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const secret = process.env.JWT_SECRET || 'cookies';
	const options = {
		expiresIn: '1 day'
	}
	return jwt.sign(payload, secret, options)
};

module.exports = router;

