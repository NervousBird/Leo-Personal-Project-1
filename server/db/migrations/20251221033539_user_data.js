export function up(knex) {
  return knex.schema.createTable('user_data', (table) => {
    table.increments('id')
    table.string('colors')
    table.string('borders')
    table.string('fonts')

    table.string('dates_range')
    table.string('leaving_point')
    table.integer('user_id')
  })
};

export function down(knex) {
  return knex.schema.dropTable('user_data')
};
