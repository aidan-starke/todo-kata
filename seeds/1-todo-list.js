
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo-list').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo-list').insert([
        {id: 1, item: 'Write Code'},
        {id: 2, item: '???'},
        {id: 3, item: 'PROFIT'}
      ]);
    });
};
