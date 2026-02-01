export function up(knex) {
  return knex.schema.createTable('saving', (table) => {
    table.increments('id')
    table.string('name')
    table.string('target')
    table.string('target_date')
  })
}

export function down(knex) {
  return knex.schema.dropTable('saving')
}
