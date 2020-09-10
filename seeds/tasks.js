
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, name: 'write code'},
        {id: 2, name: 'record video'},
        {id: 3, name: 'win'}
      ]);
    });
};
