
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'Odin',
          lastname: 'Renteria',
          username: 'odin',
          email: 'odin@odin.com',
          password: '12345',
        },
        {
          firstname: 'Ryan',
          lastname: 'Renteria',
          username: 'ryan',
          email: 'ryan@ryan.com',
          password: '12345',
        },
      ]);
    });
};