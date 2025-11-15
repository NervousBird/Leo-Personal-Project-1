/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()

  await knex('transactions').insert([
    {
      id: 1,
      name: 'Test transaction',
      type: 'Work',
      date: '2025-11-15',
      amount: '50.00',
      notes: 'This is a test',
    },
  ])
}
