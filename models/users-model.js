const db = require('../dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	findByEmail
};

function find() {
  return db('users').select('id', 'username', 'password', 'department');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add (user) {
	const [id] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users')
	.where({ id })
	.first();
}

function findByEmail(email) {
	db('users')
	.where({ email })
	.first();
}