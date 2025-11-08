
export default function up(knex) {
  return knex.schema.createTable('transaction_income', (table) => {
    table.increments('id')
    table.string('name')
    table.string('type')
    table.string('category')
    table.string('date')
    table.string('amount')
    table.string('notes')
    table.string('category_id')
  })
}

export default function down(knex) {
  return knex.schema.dropTable('transaction_income')
}
