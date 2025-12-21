export function up(knex) {
    return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('sub')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

export function down(knex) {
  return knex.schema.dropTable('users')
};
