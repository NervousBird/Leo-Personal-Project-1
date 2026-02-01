export function up(knex) {
  return knex.schema.createTable('savings', (table) => {
    table.increments('id')
    table.string('name')
    table.string('amount')
    table.string('frequency')
    table.string('starting_date')
    table.integer('saving_id')
    table.string('notes')
  })
}

export function down(knex) {
  return knex.schema.dropTable('savings')
}
