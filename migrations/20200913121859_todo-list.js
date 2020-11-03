
exports.up = function(knex) {
  return knex.schema.createTable('todo-list', table => {
      table.increments()
      table.string('item')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo-list')
};
