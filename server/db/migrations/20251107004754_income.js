
export default function up(knex) {
  return knex.schema.createTable('incomes', (table) => {
    table.increments('id')
    table.integer('income_ids')
    table.integer('investment_ids')
  })
}

export default function down(knex) {
  return knex.schema.dropTable('incomes')
}
