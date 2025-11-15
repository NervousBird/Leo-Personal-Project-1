export function up(knex) {
  return knex.schema.createTable('expenses', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type')
    table.string('frequency')
    table.string('date')
    table.string('expected')
    table.string('notes')
  })
}

export function down(knex) {
  return knex.schema.dropTable('expenses')
}
