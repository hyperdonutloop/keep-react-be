const db = require('../dbConfig.js');

module.exports = {
  find,
  add,
  update,
  remove,
  findById,
  getByUserId
};

function getByUserId(user_id) {
  return db('cards')
    .where({ user_id })
    .select('id', 'title', 'items');
}

function find() {
  return db('cards');
}

async function add(card) {
  const [id] = await db('cards').insert(card, ['id', 'title', 'items', 'user_id']);

  return findById(id);
}

function findById(id) {
  return db('cards')
    .where({ id })
    .first();
}

function update (id,user) {
  return db('cards')
    .where({ id })
    .update(user, ['id', 'title', 'items', 'user_id']);
}

function remove(id) {
  return db('cards')
    .where({ id: id })
    .delete();
}
