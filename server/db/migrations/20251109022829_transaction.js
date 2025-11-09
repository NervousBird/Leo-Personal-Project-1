export function up(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type')
    table.string('date')
    table.string('amount')
    table.string('notes')
  })
}

export function down(knex) {
  return knex.schema.dropTable('transactions')
}
