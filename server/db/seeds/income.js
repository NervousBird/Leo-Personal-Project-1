/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('incomes').del()

  await knex('incomes').insert([
    {
      id: 1,
      name: 'test',
      type: 'test',
      frequency: 'monthly',
      date: '2025-01-01',
      expected: '0.00',
      notes: 'This is a test',
    },
  ])
}
