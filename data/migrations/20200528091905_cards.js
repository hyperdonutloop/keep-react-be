
exports.up = function(knex) {
  return knex.schema.createTable('cards', tbl => {
    tbl.increments();
    tbl.string('title');
    tbl.text('items');
    tbl.boolean('completed').defaultTo(false);
    tbl
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cards')
};
