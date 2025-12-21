exports.up = function(knex) {
  return knex.schema.createTable('users-data', (table) => {
    table.increments('id')
    table.string('colors')
    table.string('dates_range')
    table.string('leaving_point')
    table.integer('user_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users-data')
};
